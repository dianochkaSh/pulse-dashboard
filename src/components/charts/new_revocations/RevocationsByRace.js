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

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import ExportMenu from '../ExportMenu';

import { COLORS, COLORS_LANTERN_SET } from '../../../assets/scripts/constants/colors';
import {
  getTrailingLabelFromMetricPeriodMonthsToggle, getPeriodLabelFromMetricPeriodMonthsToggle,
  tooltipForRateMetricWithNestedCounts,
} from '../../../utils/charts/toggles';
import { toInt } from '../../../utils/transforms/labels';

const CHART_LABELS = ['Overall', 'Not Assessed', 'Low Risk', 'Moderate Risk', 'High Risk', 'Very High Risk'];
const RISK_LEVELS = ['NOT_ASSESSED', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'];
const RACES = ['WHITE', 'BLACK', 'HISPANIC', 'ASIAN', 'AMERICAN_INDIAN_ALASKAN_NATIVE', 'PACIFIC_ISLANDER'];

const chartId = 'revocationsByRace';

const RevocationsByRace = (props) => {
  const [chartDataPoints, setChartDataPoints] = useState([]);
  const [numeratorCounts, setNumeratorCounts] = useState([]);
  const [denominatorCounts, setDenominatorCounts] = useState([]);

  const getRevocationsForRiskLevel = (forRace) => RISK_LEVELS.map((riskLevel) => (
    props.data
      .filter(({ race, risk_level: dataRiskLevel }) => race === forRace && dataRiskLevel === riskLevel)
      .reduce((result, { population_count: populationCount }) => result += toInt(populationCount), 0)
  ));

  const getSupervisionCountsForRiskLevel = (forRace) => RISK_LEVELS.map((riskLevel) => (
    props.data
      .filter(({ race, risk_level: dataRiskLevel }) => race === forRace && dataRiskLevel === riskLevel)
      .reduce((result, { total_supervision_count: totalSupervisionCount }) => result += toInt(totalSupervisionCount), 0)
  ));

  const processResponse = () => {
    const revocationsByRace = props.data.reduce(
      (result, { race, population_count: populationCount }) => {
        return { ...result, [race]: (result[race] || 0) + (toInt(populationCount) || 0) };
      }, {},
    );

    const supervisionCountsByRace = props.data.reduce(
      (result, { race, total_supervision_count: totalSupervisionCount }) => {
        return { ...result, [race]: (result[race] || 0) + (toInt(totalSupervisionCount) || 0) };
      }, {},
    );

    const getRate = (revocations, supervisionCount) => {
      if (!revocations || !supervisionCount) {
        return '0.00';
      }

      return (100 * (revocations / supervisionCount)).toFixed(2);
    };

    const revocations = RACES.map((race) => [revocationsByRace[race], ...getRevocationsForRiskLevel(race)]);
    const supervisionCounts = RACES.map((race) => [supervisionCountsByRace[race], ...getSupervisionCountsForRiskLevel(race)]);

    const dataPoints = [];
    for (let i = 0; i < revocations.length; i += 1) {
      dataPoints.push([]);
      for (let j = 0; j < revocations[i].length; j += 1) {
        const rate = getRate(revocations[i][j], supervisionCounts[i][j]);
        dataPoints[i].push(rate);
      }
    }
    setChartDataPoints(dataPoints);
    setNumeratorCounts(revocations);
    setDenominatorCounts(supervisionCounts);
  };

  useEffect(() => {
    processResponse();
  }, [
    props.data,
    props.metricPeriodMonths,
  ]);

  const chart = (
    <Bar
      id={chartId}
      data={{
        labels: CHART_LABELS,
        datasets: [{
          label: 'Caucasian',
          backgroundColor: COLORS_LANTERN_SET[0],
          hoverBackgroundColor: COLORS_LANTERN_SET[0],
          hoverBorderColor: COLORS_LANTERN_SET[0],
          data: chartDataPoints[0],
        }, {
          label: 'African American',
          backgroundColor: COLORS_LANTERN_SET[1],
          hoverBackgroundColor: COLORS_LANTERN_SET[1],
          hoverBorderColor: COLORS_LANTERN_SET[1],
          data: chartDataPoints[1],
        }, {
          label: 'Hispanic',
          backgroundColor: COLORS_LANTERN_SET[2],
          hoverBackgroundColor: COLORS_LANTERN_SET[2],
          hoverBorderColor: COLORS_LANTERN_SET[2],
          data: chartDataPoints[2],
        }, {
          label: 'Asian',
          backgroundColor: COLORS_LANTERN_SET[3],
          hoverBackgroundColor: COLORS_LANTERN_SET[3],
          hoverBorderColor: COLORS_LANTERN_SET[3],
          data: chartDataPoints[3],
        }, {
          label: 'Native American',
          backgroundColor: COLORS_LANTERN_SET[4],
          hoverBackgroundColor: COLORS_LANTERN_SET[4],
          hoverBorderColor: COLORS_LANTERN_SET[4],
          data: chartDataPoints[4],
        }, {
          label: 'Pacific Islander',
          backgroundColor: COLORS_LANTERN_SET[5],
          hoverBackgroundColor: COLORS_LANTERN_SET[5],
          hoverBorderColor: COLORS_LANTERN_SET[5],
          data: chartDataPoints[5],
        }],
      }}
      options={{
        legend: {
          position: 'bottom',
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Race/ethnicity and risk level',
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: 'Revocation rate',
            },
          }],
        },
        tooltips: {
          backgroundColor: COLORS['grey-800-light'],
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (tooltipItem, data) => tooltipForRateMetricWithNestedCounts(tooltipItem, data, numeratorCounts, denominatorCounts),
          },
        },
      }}
    />
  );

  return (
    <div>
      <h4>
        Revocation rates by race/ethnicity and risk level
        <ExportMenu
          chartId={chartId}
          chart={chart}
          metricTitle="Revocation rates by race/ethnicity and risk level"
        />
      </h4>
      <h6 className="pB-20">
        {`${getTrailingLabelFromMetricPeriodMonthsToggle(props.metricPeriodMonths)} (${getPeriodLabelFromMetricPeriodMonthsToggle(props.metricPeriodMonths)})`}
      </h6>

      <div className="static-chart-container fs-block">
        {chart}
      </div>
    </div>
  );
};

export default RevocationsByRace;
