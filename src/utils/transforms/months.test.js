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
import * as monthMethods from './months';

describe('test for file months', () => {
  const monthNumbers =  ["4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3"];
  const monthNumbersLong =  ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "-5", "1", "2", "3"];
  const differenceOrderMonthNumbers =  ["6", "8", "4", "7", "5", "9", "10", "1", "12", "11", "2", "3"];

  it('get current month name', () => {
    const testDate = new Date('2020-01-14T11:01:58.135Z');
    jest
      .spyOn(global, 'Date')
      .mockImplementation(()=> testDate);

    const dataForTest = monthMethods.getCurrentMonthName();
    expect(dataForTest).toEqual('January');
  });

  it('get short name of month', () => {
    const dataAfterTest = monthMethods.monthNameFromNumberAbbreviated(3);
    expect(dataAfterTest).toEqual('Mar');

    const dataAfterTestZeroNumber = monthMethods.monthNameFromNumberAbbreviated(0);
    expect(dataAfterTestZeroNumber).toBe(undefined);

    const dataAfterTestBigNumber = monthMethods.monthNameFromNumberAbbreviated(15);
    expect(dataAfterTestBigNumber).toBe(undefined);

    const dataAfterTestStringNumber = monthMethods.monthNameFromNumberAbbreviated('test');
    expect(dataAfterTestStringNumber).toBe(undefined);
  });

  it('get month name by number', () => {
    const dataAfterTestNumberUndefined = monthMethods.monthNameFromNumber(undefined);
    expect(dataAfterTestNumberUndefined).toBe(undefined);

    const dataAfterTestNumberZero = monthMethods.monthNameFromNumber(0);
    expect(dataAfterTestNumberZero).toBe(undefined);

    const dataAfterTestNumberWrite = monthMethods.monthNameFromNumber(5);
    expect(dataAfterTestNumberWrite).toEqual('May');

    const dataAfterTestNumberIsNotWrite = monthMethods.monthNameFromNumber(15);
    expect(dataAfterTestNumberIsNotWrite).toEqual(undefined);
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

    const dataExpectedDifferentOrder = [
      "Jun '19",
      "Aug '19",
      "Apr '19",
      "Jul '19",
      "May '19",
      "Sep '19",
      "Oct '19",
      "Jan '20",
      "Dec '20",
      "Nov '20",
      "Feb '20",
      "Mar '20"
    ];

    const dataAfterTest = monthMethods.monthNamesAllWithYearsFromNumbers(monthNumbers, true, false);
    expect(dataAfterTest).toEqual(dataExpected);

    const dataAfterTestDifferentOrderArray = monthMethods.monthNamesAllWithYearsFromNumbers(differenceOrderMonthNumbers, true, false);
    expect(dataAfterTestDifferentOrderArray).toEqual(dataExpectedDifferentOrder);

    const dataAfterTestEmptyArray = monthMethods.monthNamesAllWithYearsFromNumbers([], undefined, undefined);
    expect(dataAfterTestEmptyArray).toEqual([]);
  });

  it('month names with years from numbers', () => {
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
    const dataExpectedDifferentOrderArray =[
      "Jun '19",
      "Aug",
      "Apr",
      "Jul",
      "May",
      "Sep",
      "Oct",
      "Jan '20",
      "Dec",
      "Nov",
      "Feb",
      "Mar"
    ];

    const dataAfterTest = monthMethods.monthNamesWithYearsFromNumbers(monthNumbers, true, false);
    expect(dataAfterTest).toEqual(dataExpected);

    const dataAfterTestEmptyArray = monthMethods.monthNamesWithYearsFromNumbers([], undefined, undefined);
    expect(dataAfterTestEmptyArray).toEqual([]);

    const dataAfterTestLongArray = monthMethods.monthNamesWithYearsFromNumbers(monthNumbersLong, true, false);
    expect(dataAfterTestLongArray).toEqual(dataExpectedLongArray);

    const dataAfterTestDifferentOrderArray = monthMethods.monthNamesWithYearsFromNumbers(differenceOrderMonthNumbers, true, false);
    expect(dataAfterTestDifferentOrderArray).toEqual(dataExpectedDifferentOrderArray);
  });

  it('month names from short name', () => {
    const dataAfterTest = monthMethods.monthNamesFromShortName("Jan '20");
    expect(dataAfterTest).toEqual('January');

    const dataAfterTestLongName = monthMethods.monthNamesFromShortName("April '19");
    expect(dataAfterTestLongName).toEqual(undefined);

    const dataAfterTestEmptyName = monthMethods.monthNamesFromShortName(" ");
    expect(dataAfterTestEmptyName).toBe(undefined);
  });

});
