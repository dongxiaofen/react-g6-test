import React, { PropTypes, Component } from 'react';
const chartFunc = {};
const resizeArr = [
  'newBusiness',
  'provinceRank',
  'industryDist',
  'scaleDist',
];
export default class ResizeChart extends Component {
  static propTypes = {
    option: PropTypes.object,
    chartId: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
  }
  componentDidMount() {
    const chartId = this.props.chartId;
    const chartBox = document.getElementById(chartId);
    const myChart = window.echarts.init(chartBox);
    myChart.setOption(this.props.option);
    if (resizeArr.includes(chartId)) {
      chartFunc[chartId] = myChart.resize;
      window.addEventListener('resize', chartFunc[chartId], false);
    }
  }
  componentWillUnmount() {
    const chartId = this.props.chartId;
    if (resizeArr.includes(chartId)) {
      window.removeEventListener('resize', chartFunc[chartId], false);
      chartFunc[chartId] = null;
    }
  }
  render() {
    return (
      <div
        id={this.props.chartId}
        style={{
          position: 'relative',
          width: `${this.props.width}`,
          height: `${this.props.height}px`,
        }}
        >
      </div>
    );
  }
}
ResizeChart.defaultProps = {
  width: '100%',
};
