import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

const chartFunc = {};
@observer
export default class BaseChart extends Component {
  static propTypes = {
    chartId: PropTypes.string,
    option: PropTypes.object,
    height: PropTypes.string,
    width: PropTypes.string,
  }

  static defaultProps = {
    width: '100%'
  }

  componentDidMount() {
    const chartId = this.props.chartId;
    const myChart = window.echarts.init(document.getElementById(chartId));
    myChart.setOption(this.props.option);
    chartFunc[chartId] = myChart.resize;
    window.addEventListener('resize', chartFunc[chartId]);
  }

  componentDidUpdate() {
    const myChart = window.echarts.getInstanceByDom(document.getElementById(this.props.chartId));
    myChart.setOption(this.props.option.toJS());
  }

  componentWillUnmount() {
    const chartId = this.props.chartId;
    window.removeEventListener('resize', chartFunc[chartId]);
    delete chartFunc[chartId];
  }

  render() {
    const stylesConfig = {
      position: 'relative',
      width: `${this.props.width}`,
      height: `${this.props.height}`
    };
    return (
      <div
        id={this.props.chartId}
        style={stylesConfig}>
      </div>
    );
  }
}
