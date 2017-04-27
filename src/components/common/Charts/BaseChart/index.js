import React, { Component, PropTypes } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

const chartFunc = {};
@observer
export default class BaseChart extends Component {
  static propTypes = {
    chartId: PropTypes.string,
    option: PropTypes.object,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    clickAction: PropTypes.func,
  }

  static defaultProps = {
    width: '100%'
  }

  componentDidMount() {
    const chartId = this.props.chartId;
    const myChart = window.echarts.init(document.getElementById(chartId));
    myChart.setOption(toJS(this.props.option));
    if (this.props.clickAction) {
      myChart.on('click', this.props.clickAction);
    }
    chartFunc[chartId] = myChart.resize;
    window.addEventListener('resize', chartFunc[chartId]);
  }

  // componentDidUpdate() {
  //   const myChart = window.echarts.getInstanceByDom(document.getElementById(this.props.chartId));
  //   myChart.setOption(toJS(this.props.option));
  // }

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
