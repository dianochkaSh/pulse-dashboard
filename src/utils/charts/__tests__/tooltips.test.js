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

import '@testing-library/jest-dom/extend-expect';
import * as tooltipsMethods from '../tooltips';

describe('test for tooltips', () => {
  const tooltipItem = [
    {
      index: 'Referrals',
      datasetIndex: 0
    }, {
      index: 'Supervision',
      datasetIndex: 0
    }
  ];

  const data = {
    labels: { Referrals: 'test' },
    datasets: [
      {
        label: 'man',
        data: {
          Referrals: 20.560109289617486
        },
      }
    ]
  };

  it('tooltip for count chart', () => {
    const firstDataset = { Referrals: 456 };
    const firstPrefix = 'Referral';
    const secondDataset = { Supervision: 301 };
    const secondPrefix = 'Supervision';

    const dataEmpty = {
      labels: { Referrals: ''},
      datasets: [ ]
    };
    const dataForFirstDataset = {
      labels: { Referrals: 'test' },
      datasets: [
        {
          label: 'Referral',
          data: {
            Referrals: 20.560109289617486
          },
        }
      ]
    };

    const dataForSecondDataset = {
      labels: { Supervision: 'test' },
      datasets: [
        {
          label: 'Supervision',
          data: {
            Referrals: 20.560109289617486
          },
        }
      ]
    };

    const callback = tooltipsMethods.tooltipForCountChart(firstDataset, firstPrefix, secondDataset, secondPrefix);
    const tooltipTitle = callback.title(tooltipItem, data);
    expect(tooltipTitle).toBe('test');

    const tooltipTitleForFirstDataset = callback.label(tooltipItem[0], dataForFirstDataset);
    expect(tooltipTitleForFirstDataset).toBe('Referral: 456');

    const tooltipTitleForSecondDataset = callback.label(tooltipItem[1], dataForSecondDataset);
    expect(tooltipTitleForSecondDataset).toBe('Supervision: 301');

    const tooltipLabel = callback.label(tooltipItem[0], data);
    expect(tooltipLabel).toBe('man: 0');

    const tooltipEmptyTitle = callback.title(tooltipItem, dataEmpty);
    expect(tooltipEmptyTitle).toBe(undefined);

    const tooltipEmptyLabel = callback.label(tooltipItem[0], dataEmpty);
    expect(tooltipEmptyLabel).toEqual(': 0');

  });

  it('tooltip for rate chart', () => {
    const dataWithEmptyLabel = {
      labels: { Referrals: 'test'},
      datasets: [
        {
          label: '',
          data: {
            Referrals: ''
          },
        }
      ]
    };

    const callback = tooltipsMethods.tooltipForRateChart();

    const tooltipTitle = callback.title(tooltipItem,data);
    expect(tooltipTitle).toBe('man');

    const labelTooltip = callback.label(tooltipItem[0], data);
    expect(labelTooltip).toBe('20.56% of test');

    const tooltipEmptyTitle = callback.title(tooltipItem, dataWithEmptyLabel);
    expect(tooltipEmptyTitle).toBe('');

  });

});
