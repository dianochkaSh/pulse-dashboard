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
import Sticky from 'react-sticky-fill';

import DistrictToggle from './DistrictToggle';
import MetricTypeToggle from './MetricTypeToggle';
import SupervisionTypeToggle from './SupervisionTypeToggle';
import MetricPeriodToggle from './MetricPeriodToggle';

const TOGGLE_STYLE = {
  zIndex: 700,
  top: 55,
};

const ToggleBar = (props) => (
  <Sticky style={TOGGLE_STYLE}>
    <div className="row gap-20 pB-10">
      <div className="col-md-12">
        <div className="bd bgc-white p-20">
          <div className="row">
            {props.setChartMetricType && (
            <div className="col-md-2">
              <MetricTypeToggle onMetricTypeUpdate={props.setChartMetricType} />
            </div>
            )}

            {props.setChartMetricPeriodMonths && (
            <div className="col-md-4">
              <MetricPeriodToggle onMetricPeriodMonthsUpdate={props.setChartMetricPeriodMonths} />
            </div>
            )}

            {props.setChartSupervisionType && (
            <div className="col-md-3">
              <SupervisionTypeToggle onSupervisionTypeUpdate={props.setChartSupervisionType} />
            </div>
            )}

            {props.setChartDistrict && (
            <div className="col-md-2">
              <DistrictToggle
                districtOffices={props.districtOffices}
                districts={props.availableDistricts}
                onDistrictUpdate={props.setChartDistrict}
                stateCode={props.stateCode}
                replaceLa={props.replaceLa}
              />
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </Sticky>
);

export default ToggleBar;
