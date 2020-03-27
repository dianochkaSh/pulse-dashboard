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
    }
  ];

  const data = {
    labels: { Referrals: 'test'},
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
    const firstDataset = [478, 0, 107, 0, 42, 52, 609];
    const firstPrefix = 'Referral';
    const secondDataset = [301, 0, 71, 152, 31, 55, 559];
    const secondPrefix = 'Supervision';

    const dataEmpty = {
      labels: { Referrals: ''},
      datasets: [
        {
          label: '',
        }
      ]
    };

    const callback = tooltipsMethods.tooltipForCountChart(firstDataset, firstPrefix, secondDataset, secondPrefix);
    const tooltipTitle = callback.title(tooltipItem, data);
    expect(tooltipTitle).toBe('test');

    const tooltipLabel = callback.label(tooltipItem[0], data);
    expect(tooltipLabel).toBe('man: 0');

    const tooltipEmptyTitle = callback.title(tooltipItem, dataEmpty);
    expect(tooltipEmptyTitle).toBe('');

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
