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
import * as choroplethMethods from '../choropleth';

describe('test for choropleth', () => {

  it('color for value', () => {
    const colorForValue = choroplethMethods.colorForValue(110, 110, true, undefined);
    expect(colorForValue).toBe('rgb(31, 42, 59)');

    const colorForValueUseDarkFalse = choroplethMethods.colorForValue(110, 110, false, undefined);
    expect(colorForValueUseDarkFalse).toBe('rgb(63, 77, 98)');

    const colorForEmptyValue = choroplethMethods.colorForValue(undefined, undefined, undefined, undefined);
    expect(colorForEmptyValue).toBe(undefined);
  });

  it('county name from code', () => {

  })
});
