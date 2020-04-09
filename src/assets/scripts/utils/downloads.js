// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2019 Recidiviz, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
// =============================================================================

import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import * as csvExport from 'jsonexport/dist';
import { timeStamp } from './time';
import infoAboutChart from '../../../utils/charts/info';
import JSZip from 'jszip';

function configureFilename(chartId, toggleStates) {
  let filename = `${chartId}-${timeStamp()}`;
  if (toggleStates !== undefined) {
    if (toggleStates.metricType !== undefined) {
      filename = filename.concat('-', toggleStates.metricType);
    }
    if (toggleStates.metricPeriodMonths) {
      filename = filename.concat('-', toggleStates.metricPeriodMonths);
    }
    if (toggleStates.supervisionType) {
      filename = filename.concat('-', toggleStates.supervisionType);
    }
    if (toggleStates.district) {
      filename = filename.concat('-', toggleStates.district);
    }
  }

  return filename;
}

function downloadCanvasImage(canvas, filename, chartTitle, toggleStates) {
  const topPadding = 100;
  const temporaryCanvas = document.createElement('canvas');
  temporaryCanvas.width = canvas.width;
  temporaryCanvas.height = canvas.height + topPadding;

  // Fill the canvas with a white background and the original image
  const destinationCtx = temporaryCanvas.getContext('2d');
  destinationCtx.fillStyle = '#FFFFFF';
  destinationCtx.fillRect(0, 0, canvas.width, canvas.height + topPadding);
  destinationCtx.fillStyle = '#616161';
  destinationCtx.textAlign = 'center';
  destinationCtx.font = '30px Helvetica Neue';
  destinationCtx.fillText(chartTitle, canvas.width / 2, topPadding / 2);
  destinationCtx.drawImage(canvas, 0, topPadding);

  const data = temporaryCanvas.toDataURL('image/png;base64');
  if (toggleStates !== undefined && toggleStates.metricType !== undefined) {
    downloadjs(data, filename, 'image/png;base64');
  } else {
    return {
      name: filename,
      data: data.substring(22),
      type: "base64"
    }
  }

}
function getFormattedStr(str) {
  const firstLetter = str.slice(0, 1);
  const string = firstLetter.toUpperCase() + str.substring(1);
  return string.replace('_', ' ');
}

function getFilterValue(filterValue, descriptionPlural, descriptionOne){
  let str = '';
  if (filterValue === "All" || ((parseInt(filterValue) === 12 || parseInt(filterValue) === 36 || parseInt(filterValue) === 6 || parseInt(filterValue) === 3) && (descriptionOne === "month"))) {
    str = filterValue + " " + descriptionPlural;
  } else if(parseInt(filterValue) === 1 && (descriptionOne === "month")) {
    str = filterValue + " " + descriptionOne;
  } else {
    str = descriptionOne + getFormattedStr(filterValue.toLowerCase());
  }
  return str;
}

function getViolation(toggleStates){
  let str = '';
  if (toggleStates.reportedViolations !== undefined || toggleStates.violationType !== undefined) {
    str += "-";
    if (toggleStates.reportedViolations !== undefined && toggleStates.reportedViolations !== "" ) {
      str += toggleStates.reportedViolations + " violations or notices of citations,";
    }
    if (toggleStates.violationType !== undefined) {
      str += " most severe: " + getFormattedStr(toggleStates.violationType.toLowerCase()) + " violations or notices of citations";
    }
    return str + "\n";
  }
  return "";
}

function downloadMethodologyFile(chartId, chartTitle, timeWindowDescription, toggleStates ){
  let infoChart = infoAboutChart[chartId];
  infoChart = infoChart === undefined ? [] : infoChart;
  const startDate = new Date();
  let text = `
Chart: ${chartTitle}
Dates: ${timeWindowDescription}
Applied filters:
- ${getFilterValue(toggleStates.metricPeriodMonths, "months", "month")}, ${getFilterValue(toggleStates.district, "districts", "District: ")}, ${getFilterValue(toggleStates.chargeCategory, "supervision levels", "Supervision level: ")}, ${getFilterValue(toggleStates.supervisionType, "supervision types", "Supervision type: ")}\n`;
text += `${getViolation(toggleStates)}Export Date: ${startDate.toLocaleDateString('en-US')}
 \r\n`;
  infoChart.map((chart) => {
    text += chart.header + "\r\n";
    text += chart.body + "\r\n";
    text += "\r\n";
  });
  const filename = "methodology.txt";
  return {
    name: filename,
    data: text,
    type: "binary"
  };
}

function downloadZipFile(files, zipFilename ) {
  let zip = new JSZip();
  files.map((file) => {
    let fileTypeDescriptor = null;
    if (file.type === 'binary') {
      fileTypeDescriptor = { binary: true };
    } else if (file.type === 'base64') {
      fileTypeDescriptor = { base64: true };
    }
    if (fileTypeDescriptor !== null) {
      zip.file(file.name, file.data, fileTypeDescriptor);
    }
  });
  zip.generateAsync({ type: 'blob' }).then(function(content) {
   downloadjs(content, zipFilename );
  });
}
function downloadObjectAsCsv(exportObj, exportName, toggleStates) {
  const options = {
    mapHeaders: (header) => header.replace(/label|values./, ''),
  };
  let obj = [];

  csvExport(exportObj.series, options, (err, csv) => {
    if (err) throw err;
    const filename = `${exportName}.csv`;

    if (navigator.msSaveBlob) { // User is on Windows
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      navigator.msSaveBlob(blob, filename);
    } else {
      const encodedCsv = encodeURIComponent(csv);
      const dataStr = `data:text/csv;charset=utf-8,${encodedCsv}`;
      obj.name = filename;
      obj.data = csv;
      obj.type = "binary";
      if (toggleStates !== undefined && toggleStates.metricType !== undefined) {
        downloadjs(dataStr, filename, 'text/csv');
      }
    }
  });
  return obj;
}

function downloadObjectAsJson(exportObj, exportName) {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportObj, null, '\t'))}`;
  const filename = `${exportName}.json`;
  downloadjs(dataStr, filename, 'text/json');
}

function configureDataDownloadButton(
  chartId, chartDatasets, chartLabels, exportedStructureCallback, toggleStates,
  convertValuesToNumbers, handleTimeStringLabels, chartTitle, timeWindowDescription
) {
  return function downloadChartData() {
    const exportData = exportedStructureCallback();

    chartDatasets.forEach((dataset) => {
      if (dataset.label !== 'trendline') {
        const values = {};
        let i = 0;
        let currentYear = '';

        dataset.data.forEach((dataPoint) => {
          let csvLabel = chartLabels[i];
          if (handleTimeStringLabels) {
            const currentLabelParts = chartLabels[i].split(' ');
            if (currentLabelParts.length > 1 && currentLabelParts[1] !== currentYear) {
              currentYear = currentLabelParts[1];
            }
            if (currentLabelParts.length === 1 && currentYear.length > 1) {
              csvLabel = `${csvLabel} ${currentYear}`;
            }
          }

          if (convertValuesToNumbers === undefined || convertValuesToNumbers) {
            values[csvLabel] = Number(dataPoint);
          } else {
            values[csvLabel] = dataPoint;
          }
          i += 1;
        });

        exportData.series.push({
          label: dataset.label,
          values,
        });
      }
    });

    const filename = configureFilename(chartId, toggleStates);
    if (toggleStates.metricType !== undefined) {
      downloadObjectAsCsv(exportData, filename, toggleStates);
    } else {
      const methodologyFile = downloadMethodologyFile(chartId, chartTitle, timeWindowDescription, toggleStates);
      const csvFile = downloadObjectAsCsv(exportData, filename);
      let files = [methodologyFile, csvFile];
      downloadZipFile(files, "export_data.zip");
    }

  };
}
function configureImageDownload(canvas, filename, chartTitle, toggleStates, chartId, timeWindowDescription) {
  if(toggleStates.metricType !== undefined) {
    downloadCanvasImage(canvas, filename, chartTitle, toggleStates);
  } else {
    const methodologyFile = downloadMethodologyFile(chartId, chartTitle, timeWindowDescription, toggleStates);
    const imageFile = downloadCanvasImage(canvas, filename, chartTitle, toggleStates);
    const files = [methodologyFile, imageFile];
    downloadZipFile(files, "export_image.zip");
  }

}
function configureDownloadButtons(
  chartId, chartTitle, chartDatasets, chartLabels, chartBox,
  exportedStructureCallback, toggleStates, convertValuesToNumbers, handleTimeStringLabels, timeWindowDescription
) {
  const filename = configureFilename(chartId, toggleStates);

  const downloadChartAsImageButton = document.getElementById(`downloadChartAsImage-${chartId}`);
  if (downloadChartAsImageButton) {
    downloadChartAsImageButton.onclick = function downloadChartImage() {
      configureImageDownload(chartBox || document.getElementById(chartId), `${filename}.png`, chartTitle, toggleStates, chartId, timeWindowDescription);

    };
  }

  const downloadChartDataButton = document.getElementById(`downloadChartData-${chartId}`);
  if (downloadChartDataButton) {
    downloadChartDataButton.onclick = configureDataDownloadButton(
      chartId, chartDatasets, chartLabels, exportedStructureCallback, toggleStates,
      convertValuesToNumbers, handleTimeStringLabels, chartTitle, timeWindowDescription
    );
  }
}

function configureDownloadButtonsRegularElement(
  chartId, chartTitle, chartDatasets, chartLabels, chartBox,
  exportedStructureCallback, toggleStates, convertValuesToNumbers, handleTimeStringLabels, timeWindowDescription
) {
  const downloadChartAsImageButton = document.getElementById(`downloadChartAsImage-${chartId}`);
  if (downloadChartAsImageButton) {
    downloadChartAsImageButton.onclick = function downloadChartImage() {
      const element = document.getElementById(chartId);
      // Setting the Y-scroll position fixes a bug that causes the image to be cut off when scrolled
      // partially down the page, without changing the user's actual scroll position
      html2canvas(element, { scrollY: -window.scrollY }).then((canvas) => {
        configureImageDownload(canvas, `${chartId}-${timeStamp()}.png`, chartTitle, toggleStates, chartId, timeWindowDescription);
      });
    };
  }

  const downloadChartDataButton = document.getElementById(`downloadChartData-${chartId}`);
  if (downloadChartDataButton) {
    downloadChartDataButton.onclick = configureDataDownloadButton(
      chartId, chartDatasets, chartLabels, exportedStructureCallback, toggleStates,
      convertValuesToNumbers, handleTimeStringLabels, chartTitle, timeWindowDescription
    );
  }
}

export {
  downloadCanvasImage,
  downloadObjectAsCsv,
  downloadObjectAsJson,
  configureDownloadButtons,
  configureDownloadButtonsRegularElement,
};
