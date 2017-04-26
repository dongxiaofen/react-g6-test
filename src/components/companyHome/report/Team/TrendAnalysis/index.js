import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import styles from './index.less';
import { Row, Col } from 'components/common/layout';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';

function TrendAnalysis({ salaryAvgTrend, leaveTrend }) {
  const salaryAvgTrendOption = {
    dataZoom: [
      {
        type: 'slider',
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
      },
      {
        type: 'inside',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#e5e5e5',
        }
      },
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: (ticket) => {
        const str = `
                <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff">
                  <p style="text-align: center;">
                    <a style="color:#999999;">
                      ${ticket[0].name}
                    </a>
                  </p>
                  <p style="text-align: center;">
                    <a style="color:#43BF77;">
                      招聘平均薪资：${ticket[0].data}元
                    </a>
                  </p>
                </div>`;
        return str;
      },
    },
    grid: {
      top: '40',
      left: '2%',
      right: '6%',
      bottom: '45',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: ['#f5f5f5']
        }
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#e5e5e5',
        }
      },
      axisLabel: {
        textStyle: {
          color: '#999999',
        },
      },
      data: toJS(salaryAvgTrend.Axis)
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#999999',
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: '头条更新企业',
        type: 'line',
        stack: '总量2',
        areaStyle: { normal: {} },
        lineStyle: {
          normal: {
            color: '#43BF77',
            width: 3,
          }
        },
        itemStyle: {
          normal: {
            color: 'rgba(67, 191, 119, 0.2)'
          }
        },
        data: toJS(salaryAvgTrend.data)
      },
    ]
  };
  const leaveTrendOption = {
    dataZoom: [
      {
        type: 'slider',
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
      },
      {
        type: 'inside',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#e5e5e5',
        }
      },
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: (ticket) => {
        const itemEach = (item) => {
          let str = '';
          if (item) {
            for (const val in item) {
              if (item.hasOwnProperty(val)) {
                str += `
                  <p style="text-align: left;">
                    <a style="color:#E25252;">
                      ${val}：${item[val]}人
                    </a>
                  </p>
                `;
              }
            }
          }
          return str;
        };
        const str = `
                <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff">
                  <p style="text-align: center;">
                    <a style="color:#999999;">
                      ${ticket[0].name}
                    </a>
                  </p>
                  <p style="text-align: center;">
                    <a style="color:#E25252;">
                      刷新简历人数：${ticket[0].value}人
                    </a>
                  </p>
                  ${itemEach(ticket[0].data.item)}
                </div>`;
        return str;
      },
    },
    grid: {
      top: '40',
      left: '2%',
      right: '6%',
      bottom: '45',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: ['#f5f5f5']
        }
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#e5e5e5',
        }
      },
      axisLabel: {
        textStyle: {
          color: '#999999',
        },
      },
      data: toJS(leaveTrend.Axis)
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: '#999999',
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: '头条更新企业',
        type: 'line',
        stack: '总量2',
        areaStyle: { normal: {} },
        lineStyle: {
          normal: {
            color: '#E25252',
            width: 3,
          }
        },
        itemStyle: {
          normal: {
            color: 'rgba(226, 82, 82, 0.2)'
          }
        },
        data: toJS(leaveTrend.data)
      },
    ]
  };
  return (
    <div>
      <Row>
        <Col width="6">
          <div className={styles['trend-box-block']}>
            <div className={styles['chart-title']}>招聘平均薪资趋势：</div>
            <BaseChart chartId="salaryAvgTrend" height="290px" option={salaryAvgTrendOption} />
          </div>
        </Col>
        <Col width="6">
          <div className={styles['trend-box-block']}>
            <div className={styles['chart-title']}>离职意向趋势：</div>
            <BaseChart chartId="leaveTrend" height="290px" option={leaveTrendOption} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

TrendAnalysis.propTypes = {
  salaryAvgTrend: PropTypes.object,
  leaveTrend: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    module: '趋势分析',
    error: !props.salaryAvgTrend.data.length && !props.leaveTrend.data.length
  })
})(observer(TrendAnalysis));
