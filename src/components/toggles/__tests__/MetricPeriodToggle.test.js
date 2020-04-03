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

import { fireEvent, getByLabelText } from "@testing-library/dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MetricPeriodToggle from "../MetricPeriodToggle";

describe("test for component MetricPeriodToggle", () => {
  const props = {
    onMetricPeriodMonthsUpdate: jest.fn(),
  };

  it("display all input in form", () => {
    const { container } = render(<MetricPeriodToggle {...props} />);

    const inputValue36 = container.querySelector("input[value='36']");
    expect(inputValue36.value).toBe("36");

    const inputValue12 = container.querySelector("input[value='12']");
    expect(inputValue12.value).toBe("12");

    const inputValue6 = container.querySelector("input[value='6']");
    expect(inputValue6.value).toBe("6");

    const inputValue3 = container.querySelector("input[value='3']");
    expect(inputValue3.value).toBe("3");

    const inputValue1 = container.querySelector("input[value='1']");
    expect(inputValue1.value).toBe("1");
  });

  it("metric period = 36", () => {
    const handleChange = jest.fn();
    const { container } = render(<MetricPeriodToggle {...props} />);
    const inputValue36 = getByLabelText(container, "3y", {
      selector: "input",
    });
    fireEvent.change(inputValue36, { target: { value: "36" } });
    expect(inputValue36.value).toEqual("36");

    setTimeout(function () {
      expect(handleChange).toBeCalledTimes(1);
      expect(props.onMetricPeriodMonthsUpdate).toHaveBeenCalledTimes(1);
      expect(inputValue36.checked).toHaveAttribute("checked", "36");
    }, 1000);
  });

  it("metric period = 6", () => {
    const handleChange = jest.fn();
    const { container } = render(<MetricPeriodToggle {...props} />);
    const inputValue6 = getByLabelText(container, "6m", {
      selector: "input",
    });
    fireEvent.change(inputValue6, { target: { value: "6" } });
    expect(inputValue6.value).toEqual("6");

    setTimeout(function () {
      expect(handleChange).toBeCalledTimes(1);
      expect(props.onMetricPeriodMonthsUpdate).toHaveBeenCalledTimes(1);
      expect(inputValue6.checked).toHaveAttribute("checked", "6");
    }, 1000);
  });

  it("metric period = 3", () => {
    const handleChange = jest.fn();
    const { container } = render(<MetricPeriodToggle {...props} />);

    const inputValue3 = getByLabelText(container, "3m", {
      selector: "input",
    });
    fireEvent.change(inputValue3, { target: { value: "3" } });
    expect(inputValue3.value).toEqual("3");

    setTimeout(function () {
      expect(handleChange).toBeCalledTimes(1);
      expect(props.onMetricPeriodMonthsUpdate).toHaveBeenCalledTimes(1);
      expect(inputValue3.checked).toHaveAttribute("checked", "3");
    }, 1000);
  });

  it("metric period = 1", () => {
    const handleChange = jest.fn();
    const { container } = render(<MetricPeriodToggle {...props} />);
    const inputValue1 = getByLabelText(container, "1m", {
      selector: "input",
    });
    fireEvent.change(inputValue1, { target: { value: "1" } });
    expect(inputValue1.value).toEqual("1");

    setTimeout(function () {
      expect(handleChange).toBeCalledTimes(1);
      expect(props.onMetricPeriodMonthsUpdate).toHaveBeenCalledTimes(1);
      expect(inputValue1.checked).toHaveAttribute("checked", "1");
    }, 1000);
  });

  it("metric period = 12", () => {
    const handleChange = jest.fn();
    const { container } = render(<MetricPeriodToggle {...props} />);
    const inputValue12 = getByLabelText(container, "1y", {
      selector: "input",
    });
    fireEvent.change(inputValue12, { target: { value: "12" } });
    expect(inputValue12.value).toEqual("12");

    setTimeout(function () {
      expect(handleChange).toBeCalledTimes(1);
      expect(props.onMetricPeriodMonthsUpdate).toHaveBeenCalledTimes(1);
      expect(inputValue12.checked).toHaveAttribute("checked", "12");
    }, 1000);
  });
});
