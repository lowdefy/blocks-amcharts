/*
  Copyright 2021 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import React from 'react';
import { type, get } from '@lowdefy/helpers';
import { blockDefaultProps } from '@lowdefy/block-tools';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class AmChartsXYBlock extends React.Component {
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
    this.addListeners = this.addListeners.bind(this);
    this.createEventListener = this.createEventListener.bind(this);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const { properties, loading } = this.props;
    const { data, ...settings } = properties;
    this.createChart({ settings, data, loading });
  }

  shouldComponentUpdate(nextProps) {
    const { properties, loading } = nextProps;
    try {
      // eslint-disable-next-line react/destructuring-assignment
      const { data: oldData, ...oldSettings } = this.props.properties;
      const { data, ...settings } = properties;
      if (!this.chart || JSON.stringify(oldSettings) !== JSON.stringify(settings)) {
        this.createChart({ settings, data, loading });
      }
      if (this.chart && JSON.stringify(oldData) !== JSON.stringify(data)) {
        this.chart.data = type.isArray(data) ? data : [];
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  createChart({ settings, data, loading }) {
    if (!loading && this.chartRef) {
      try {
        const chart = am4core.createFromConfig(
          this.addListeners(settings),
          this.chartRef.current,
          am4charts.XYChart
        );
        chart.data = type.isArray(data) ? data : [];
        this.chart = chart;
      } catch (e) {
        console.log(e);
      }
    }
  }

  addListeners(obj) {
    if (type.isUndefined(obj)) return obj;
    // EXPERIMENTAL: The events listener implementation might change in future versions.
    const fns = {};
    function reviver(key, value) {
      if (type.isObject(value) && value.amcharts_event_listener) {
        return this.createEventListener(value.amcharts_event_listener);
      }
      if (type.isString(value) && value.includes('___fn:0.')) {
        return (_, args) => fns[value](get(args, 'dataItem.dataContext'));
      }
      return value;
    }
    function replacer(_, val) {
      if (typeof val === 'function') {
        const fnId = `___fn:${Math.random().toString(36)}`;
        fns[fnId] = val;
        return fnId;
      }
      return val;
    }
    // Revive in order to add event listeners,
    // and map functions to support _function adapters.
    return JSON.parse(JSON.stringify(obj, replacer), reviver.bind(this));
  }

  createEventListener({ name }) {
    function eventHandler(event) {
      this.props.methods.triggerEvent({
        name,
        event: get(event, 'target.dataItem.dataContext'),
      });
    }
    return eventHandler.bind(this);
  }

  render() {
    const { blockId, methods, properties } = this.props;
    return (
      <div
        id={blockId}
        ref={this.chartRef}
        className={methods.makeCssClass({
          width: '100%',
          height: properties.height || 500,
        })}
      />
    );
  }
}
AmChartsXYBlock.defaultProps = blockDefaultProps;

export default AmChartsXYBlock;
