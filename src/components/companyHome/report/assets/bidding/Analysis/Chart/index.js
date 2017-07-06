import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { loadingComp } from 'components/hoc';
import styles from './index.less';
import { Row, Col } from 'components/common/layout';
import BaseChart from 'components/common/Charts/BaseChart';

function Chart({ assetsStore }) {
  const biddingAnalysis = toJS(assetsStore.biddingAnalysis);
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
        left: 100,
        right: 100,
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
      left: '8%',
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
        data: biddingAnalysis.axis
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
        barMaxWidth: barWidth,
        data: biddingAnalysis.data.winMoneyAmount
      },
      {
        name: '中标金额',
        type: 'bar',
        barMaxWidth: barWidth,
        data: biddingAnalysis.data.bidMoneyAmount
      },
      {
        name: '投标次数',
        type: 'line',
        yAxisIndex: 1,
        data: biddingAnalysis.data.winCount
      },
      {
        name: '中标次数',
        type: 'line',
        yAxisIndex: 1,
        data: biddingAnalysis.data.bidCount
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
  assetsStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.assetsStore.biddingAnalysisLoading,
    module: '招投标分析图',
    error: props.assetsStore.isErrAnalysis
  })
})(observer(Chart));
