import React from 'react';
import { type, set, get } from '@lowdefy/helpers';
import { blockDefaultProps } from '@lowdefy/block-tools';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class AmChartsPieBlock extends React.Component {
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
          am4charts.PieChart
        );
        chart.data = type.isArray(data) ? data : [];
        this.chart = chart;
      } catch (e) {
        console.log(e);
      }
    }
  }

  addListeners(obj) {
    // EXPERIMENTAL: The events listener implementation might change in future versions.
    function reviver(key, value) {
      if (type.isObject(value) && value._amcharts_event_listener) {
        return this.createEventListener(value._amcharts_event_listener);
      }
      return value;
    }
    if (type.isUndefined(obj)) return obj;
    return JSON.parse(JSON.stringify(obj), reviver.bind(this));
  }

  createEventListener({ name, log, eventKeys }) {
    function eventHandler(event) {
      if (log) {
        console.log(event);
      }
      const args = {};
      if (type.isArray(eventKeys)) {
        eventKeys.forEach((key) => {
          set(args, key, get(event, key));
        });
      }
      this.props.methods.triggerEvent({
        name,
        event: args,
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

AmChartsPieBlock.defaultProps = blockDefaultProps;

export default AmChartsPieBlock;
