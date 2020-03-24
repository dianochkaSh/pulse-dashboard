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
import tk from 'timekeeper';
import '@testing-library/jest-dom/extend-expect';
import * as monthMethods from './months';

describe('test for file months', () => {
  const monthNumbers =  ["4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3"];
  const monthNumbersLong =  ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "1", "2", "3"];

  it('get current month name', () => {


  //getCurrentMonthName

  });

  it('month names from numbers', () => {
    const monthShort = [
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar'
    ];
    const monthLong = [
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
      'January',
      'February',
      'March'
    ];

    const monthLonger =  [
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      undefined,
      undefined,
      'Jan',
      'Feb',
      'Mar'
    ];

    const dataAfterTestWithAbbreviated = monthMethods.monthNamesFromNumbers(monthNumbers, true );
    expect(dataAfterTestWithAbbreviated).toEqual(monthShort);

    const dataAfterTestWithoutAbbreviated = monthMethods.monthNamesFromNumbers(monthNumbers, false);
    expect(dataAfterTestWithoutAbbreviated).toEqual(monthLong);

    const dataAfterTestEmptyArray = monthMethods.monthNamesFromNumbers([], undefined);
    expect(dataAfterTestEmptyArray).toEqual([]);

    const dataAfterLongArray = monthMethods.monthNamesFromNumbers(monthNumbersLong, true);
    expect(dataAfterLongArray).toEqual(monthLonger);

  });

  it('month names all with years from numbers', () => {
    const dataAfterTest = monthMethods.monthNamesAllWithYearsFromNumbers(monthNumbers, true, false);
    const dataExpected = [
      "Apr '19",
      "May '19",
      "Jun '19",
      "Jul '19",
      "Aug '19",
      "Sep '19",
      "Oct '19",
      "Nov '19",
      "Dec '19",
      "Jan '20",
      "Feb '20",
      "Mar '20"
    ];

    expect(dataAfterTest).toEqual(dataExpected);
  });

  it('month names with years from numbers', () => {
    const dataAfterTest = monthMethods.monthNamesWithYearsFromNumbers(monthNumbers, true, false);
    const dataExpected = [
      "Apr '19",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan '20",
      "Feb",
      "Mar"
    ];
    const dataExpectedLongArray = [
      "Apr '19",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      undefined,
      undefined,
      "Jan '20",
      "Feb",
      "Mar"
      ];


    expect(dataAfterTest).toEqual(dataExpected);

    const dataAfterTestEmptyArray = monthMethods.monthNamesWithYearsFromNumbers([], undefined, undefined);
    expect(dataAfterTestEmptyArray).toEqual([]);

    const dataAfterTestLongArray = monthMethods.monthNamesWithYearsFromNumbers(monthNumbersLong, true, false);
    expect(dataAfterTestLongArray).toEqual(dataExpectedLongArray);


  });

});
