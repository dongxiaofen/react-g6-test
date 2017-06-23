import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';
import { Row, Col } from 'components/common/layout';
import BaseChart from 'components/common/Charts/BaseChart';

function Chart({}) {
  const colors = ['#bbe3a6', '#90caf9', '#66bb6a', '#42A5F5'];
  const yAxisColor = '#eeeeee';
  const textStyle = {
    color: '#9e9e9e'
  };
  const splitLine = { show: false };
  const axisTickShow = false;
  const barWidth = 25;

  const chartTicket = (ticket) => {
    const unit = (seriesName) => seriesName.includes('金额') ? '元' : '次';
    const output = [];
    output.push(`
      <p style="text-align: center; padding-bottom: 10px;">
        <a style="color: #999999;">
          ${ticket[0].name}
        </a>
      </p>
    `);
    ticket.forEach((item) => {
      output.push(`
        <p style="text-align: center; padding-bottom: 6px;">
          <a style="color: ${item.color};">
            <span style="padding-right: 15px">${item.seriesName}</span>
            <span>${item.value}</span>${unit(item.seriesName)}
          </a>
        </p>
      `);
    });
    return output.join('');
  };

  const option = {
    color: colors,
    dataZoom: [
      {
        type: 'slider',
        left: 70,
        right: 70,
        bottom: 0,
        dataBackground: {
          areaStyle: {
            color: '#eeeeee',
          },
        },
        fillerColor: 'rgba(230, 230, 230, 0.4)',
        handleStyle: {
          color: '#dddddd'
        },
        textStyle: textStyle
      },
      {
        type: 'inside',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: yAxisColor
        }
      },
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: (ticket) => {
        const backgroundStyle = [
          'padding: 15px 20px',
          'background-color: #ffffff',
          'box-shadow: 0 0 7px #dddddd',
        ];
        const str = `
          <div style="${backgroundStyle.join(';')}">
            ${chartTicket(ticket)}
          </div>`;
        return str;
      },
    },
    grid: {
      top: 30,
      left: '5%',
      right: '5%'
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: axisTickShow,
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: yAxisColor
          }
        },
        axisLabel: {
          textStyle: {
            color: '#757575'
          }
        },
        data: ['2017-01月', '2017-02月', '2017-03月', '2017-04月', '2017-05月', '2017-06月', '2017-07月', '2017-08月', '2017-09月', '2017-10月', '2017-11月', '2017-12月']
      }
    ],
    yAxis: [
      {
        type: 'value',
        position: 'left',
        name: '金额',
        nameTextStyle: textStyle,
        axisTick: {
          show: axisTickShow,
        },
        axisLine: {
          lineStyle: {
            color: yAxisColor
          }
        },
        axisLabel: {
          textStyle: textStyle
        },
        splitLine: splitLine
      },
      {
        type: 'value',
        position: 'right',
        name: '次数',
        nameTextStyle: textStyle,
        axisTick: {
          show: axisTickShow,
        },
        axisLine: {
          lineStyle: {
            color: yAxisColor
          }
        },
        axisLabel: {
          textStyle: textStyle
        },
        splitLine: splitLine
      }
    ],
    series: [
      {
        name: '投标金额',
        type: 'bar',
        barWidth: barWidth,
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      },
      {
        name: '中标金额',
        type: 'bar',
        barWidth: barWidth,
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      },
      {
        name: '投标次数',
        type: 'line',
        yAxisIndex: 1,
        data: [2.0, 0, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      },
      {
        name: '中标次数',
        type: 'line',
        yAxisIndex: 1,
        data: [3.0, 3.2, 3.3, 5.5, 6.3, 11.2, 21.3, 22.4, 24.0, 12.5, 11.0, 3.2]
      }
    ]
  };
  return (
    <div>
      <Row>
        <Col width="10">
          <BaseChart chartId="biddingAnalysisChart" height="370px" option={option} />
        </Col>
        <Col width="2">
          <div className={styles.marked}>
            <div className={`clearfix`}>
              <div className={styles.blockGreen}></div>
              <div className={styles.text}>投标金额（元）</div>
            </div>
            <div className={`clearfix`}>
              <div className={styles.blockBlue}></div>
              <div className={styles.text}>中标金额（元）</div>
            </div>
            <div className={`clearfix`}>
              <div className={styles.roundGreen}></div>
              <div className={styles.text}>投标次数</div>
            </div>
            <div className={`clearfix`}>
              <div className={styles.roundBlue}></div>
              <div className={styles.text}>中标次数</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

Chart.propTypes = {
  foo: PropTypes.string,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.biddingData.biddingLoading,
    module: '招投标分析图',
    // error: !props.biddingData.analysis || Object.keys(props.biddingData.analysis).length === 0
    error: false
  })
})(observer(Chart));
