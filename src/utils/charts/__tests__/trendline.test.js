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
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import * as trendlineMethods from '../trendline';

describe('test for file trendline', () => {
  const dataPoints = [
    "620.00",
    "967.00",
    "367.00",
    "986.00",
    "809.00",
    "473.00",
    "903.00",
    "413.00",
    "534.00",
    "413.00",
    "349.00",
    "271.00"
  ];
  const dataDifferentPoints  = [
    "-1.56",
    "-0.19",
    "-1.88",
    "1.24",
    "-1.28",
    "0.84",
    "0.89",
    "-1.64",
    "0.90",
    "-1.01",
    "1.93",
    "-0.06"
  ];
  const dataIncorrectPoint =[
    "620.00",
    "967.00",
    "367.00",
    "986.00",
    "809.00",
    "473.00",
    "test",
    "413.00",
    "534.00",
    10,
    "349.00",
    "271.00"
  ];

  it('generate trendline dataset', () => {
    const lineColor = 'rgba(63, 77, 98, .7)';
    const expectedDataset = {
      label: 'trendline',
      backgroundColor: 'rgba(63, 77, 98, .7)',
      borderColor: 'rgba(63, 77, 98, .7)',
      fill: false,
      pointRadius: 0,
      hitRadius: 0,
      hoverRadius: 0,
      borderWidth: 1.5,
      lineTension: 0,
      data:
        [ 824.7179487179487,
          785.9455128205128,
          747.1730769230769,
          708.400641025641,
          669.6282051282051,
          630.8557692307692,
          592.0833333333333,
          553.3108974358975,
          514.5384615384614,
          475.7660256410256,
          436.99358974358967,
          398.22115384615375
        ]
    };

    const expectedDatasetDifferentPoints = {
      label: 'trendline',
      backgroundColor: 'rgba(63, 77, 98, .7)',
      borderColor: 'rgba(63, 77, 98, .7)',
      fill: false,
      pointRadius: 0,
      hitRadius: 0,
      hoverRadius: 0,
      borderWidth: 1.5,
      lineTension: 0,
      data:
        [ -0.9005128205128208,
          -0.7757051282051284,
          -0.6508974358974361,
          -0.5260897435897437,
          -0.40128205128205136,
          -0.276474358974359,
          -0.15166666666666662,
          -0.02685897435897433,
          0.09794871794871807,
          0.22275641025641035,
          0.34756410256410275,
          0.47237179487179515 ]
    };
    const expectedDatasetEmptyPoints =  {
      label: 'trendline',
      backgroundColor: '',
      borderColor: '',
      fill: false,
      pointRadius: 0,
      hitRadius: 0,
      hoverRadius: 0,
      borderWidth: 1.5,
      lineTension: 0,
      data: []
    };
    const expectedData = [
      824.7179487179487,
      785.9455128205128,
      747.1730769230769,
      708.400641025641,
      669.6282051282051,
      630.8557692307692,
      592.0833333333333,
      553.3108974358975,
      514.5384615384614,
      475.7660256410256,
      436.99358974358967,
      398.22115384615375
    ];

    const dataset = trendlineMethods.generateTrendlineDataset(dataPoints, lineColor);
    expect(dataset).toEqual(expectedDataset);

    const datasetWithDifferentPoints = trendlineMethods.generateTrendlineDataset(dataDifferentPoints, lineColor);
    expect(datasetWithDifferentPoints).toEqual(expectedDatasetDifferentPoints);

    const datasetEmptyPoint = trendlineMethods.generateTrendlineDataset([], '');
    expect(datasetEmptyPoint).toEqual(expectedDatasetEmptyPoints);

    const { label, backgroundColor, borderColor, fill, pointRadius, hitRadius, hoverRadius, borderWidth, lineTension, data } = trendlineMethods.generateTrendlineDataset(dataPoints, lineColor);
    expect(label).toBe('trendline');
    expect(backgroundColor).toBe('rgba(63, 77, 98, .7)');
    expect(borderColor).toBe('rgba(63, 77, 98, .7)');
    expect(fill).toBe(false);
    expect(pointRadius).toBe(0);
    expect(hitRadius).toBe(0);
    expect(hoverRadius).toBe(0);
    expect(borderWidth).toBe(1.5);
    expect(lineTension).toBe(0);
    expect(data).toEqual(expectedData);
  });

  it('get tooltip without trendline', () => {
    const tooltipItem = {
      datasetIndex: 'test',
      yLabel: 'Revocation count: '
    };
    const data = {
      datasets:{ test: {label: 'test'}}
    };
    const units = 45;

    const tooltipItemTrendline = {
      datasetIndex: 'trendline',
      yLabel: 'Revocation count: '
    };
    const dataForTrendline = {
      datasets:{ trendline: {label: 'trendline'}}
    };

    const tooltipItemEmptyYLabel = {
      datasetIndex: 'test',
      yLabel: ' '
    };

    const tooltip = trendlineMethods.getTooltipWithoutTrendline(tooltipItem, data, units);
    expect(tooltip).toBe('Revocation count: 45');

    const tooltipForTrendline = trendlineMethods.getTooltipWithoutTrendline(tooltipItemTrendline, dataForTrendline, units);
    expect(tooltipForTrendline).toBe('');

    const tooltipEmptyYLabel =  trendlineMethods.getTooltipWithoutTrendline(tooltipItemEmptyYLabel, data, undefined);
    expect(tooltipEmptyYLabel).toBe(' ');
  });

  it('trendline slope', () => {
    const trendlineValues = [
      805.3846153846154,
      775.0705128205128,
      744.7564102564103,
      714.4423076923076,
      684.1282051282051,
      653.8141025641025,
      623.5,
      593.1858974358975,
      562.8717948717949,
      532.5576923076924,
      502.2435897435898,
      471.92948717948724
    ];
    const terndlineInvalidValue = [
      205.3846157846154,
      275.0705128205128,
      744.7564102564103,
      714.4423076923076,
      'test',
      653.8141025641025,
      '623.5',
      593.1858974358975,
      262.8717948717949,
      532.5576923076924,
      402.2435897435898,
      471.92948717948724
    ];
    const trendlineTest = trendlineMethods.trendlineSlope(trendlineValues);
    expect(trendlineTest).toBe(-27.787927350427342);

    const trendlineTestEmptyArray = trendlineMethods.trendlineSlope([]);
    expect(trendlineTestEmptyArray).toBe(NaN);

    const trendlineTestInvalidEntries = trendlineMethods.trendlineSlope(terndlineInvalidValue);
    expect(trendlineTestInvalidEntries).toBe(22.212072616239322);

    const trendlineTestUndefinedEntries = trendlineMethods.trendlineSlope(undefined);
    expect(trendlineTestUndefinedEntries).toBe(0);
  });

  it('trendline data', () => {
    const expectedDate = [
      824.7179487179487,
      785.9455128205128,
      747.1730769230769,
      708.400641025641,
      669.6282051282051,
      630.8557692307692,
      592.0833333333333,
      553.3108974358975,
      514.5384615384614,
      475.7660256410256,
      436.99358974358967,
      398.22115384615375
    ];
    const expectedIncorrectDate = [ NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN ];

    const trendlineData = trendlineMethods.trendlineData(dataPoints);
    expect(trendlineData).toEqual(expectedDate);

    const trendlineErrorData = trendlineMethods.trendlineData([]);
    expect(trendlineErrorData).toEqual([]);

    const trendlineIncorrectDate = trendlineMethods.trendlineData(dataIncorrectPoint);
    expect(trendlineIncorrectDate).toEqual(expectedIncorrectDate);
  });

});
