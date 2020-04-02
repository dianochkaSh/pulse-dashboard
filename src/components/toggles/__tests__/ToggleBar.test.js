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
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ToggleBar from "../ToggleBar";

configure({ adapter: new Adapter() });

describe("show metric type = count", () => {
  const props = {
    districtOffices: [],
    availableDistricts: [],
    stateCode: undefined,
    replaceLa: undefined,
  };

  it("check display component MetricTypeToggle", () => {
    const nextProps = {
      ...props,
      setChartMetricType: jest.fn(),
    };

    const componentToggleBar = shallow(<ToggleBar {...nextProps} />);
    expect(componentToggleBar.find("MetricTypeToggle")).toHaveLength(1);
  });

  it("check display component MetricPeriodToggle", () => {
    const nextProps = {
      ...props,
      setChartMetricPeriodMonths: jest.fn(),
    };

    const componentToggleBar = shallow(<ToggleBar {...nextProps} />);
    expect(componentToggleBar.find("MetricPeriodToggle")).toHaveLength(1);
  });

  it("check display component SupervisionTypeToggle", () => {
    const nextProps = {
      ...props,
      setChartSupervisionType: jest.fn(),
    };

    const componentToggleBar = shallow(<ToggleBar {...nextProps} />);
    expect(componentToggleBar.find("SupervisionTypeToggle")).toHaveLength(1);
  });

  it("check display component DistrictToggle", () => {
    const nextProps = {
      ...props,
      replaceLa: true,
      setChartDistrict: jest.fn(),
      availableDistricts: ["beulah", "bismarck", "bottineau"],
      districtOffices: [
        {
          state_code: "US_DEMO",
          district: 16,
          site_name: "Beulah",
          long: -101.78521,
          lat: 47.260616,
        },
      ],
    };
    const componentToggleBar = shallow(<ToggleBar {...nextProps} />);
    expect(componentToggleBar.find("DistrictToggle")).toHaveLength(1);
  });
});
