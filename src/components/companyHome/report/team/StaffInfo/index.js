import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import styles from './index.less';
import { Row, Col } from 'components/common/layout';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';

function RecruitmentInfo({ finishSchool, majorInfo }) {
  const modifySchoolData = ()=>{
    const data = finishSchool.data.slice(0);
    let sum = 0;
    data.forEach((item)=>{
      sum += item;
    });
    let result = [];
    if (sum !== 0) {
      result = data.map((dataItem)=>{
        const percent = Number((dataItem / sum * 100).toFixed(2));
        return percent;
      });
    }
    return result;
  };
  const finishSchoolOption = {
    tooltip: {
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: (ticket) => {
        const str = `
          <div style="box-shadow: 0 0 7px #ddd; padding: 15px 20px; background-color: #fff">
            <p style="text-align: center;">
              <a style="color:#9BCB65;">
                ${ticket.name}：${ticket.value}%
              </a>
            </p>
          </div>`;
        return str;
      },
    },
    grid: {
      top: '30',
      left: '1%',
      right: '0',
      bottom: '0',
      containLabel: true
    },
    barMaxWidth: 14,
    xAxis: {
      type: 'value',
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      splitLine: {
        show: false,
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
      data: toJS(finishSchool.Axis)
    },
    series: [
      {
        name: '2012年',
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#9BCB65',
            opacity: 0.6
          },
          emphasis: {
            color: '#9BCB65',
            opacity: 1,
          }
        },
        data: modifySchoolData(toJS(finishSchool.data))
      }
    ]
  };
  const majorInfoOption = {
    tooltip: {
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: (ticket) => {
        const str = `
          <div style="box-shadow: 0 0 7px #ddd; padding: 15px 20px; background-color: #fff">
            <p style="text-align: center;">
              <a style="color:#FFBD3D;">
                ${ticket.name}：${ticket.value}%
              </a>
            </p>
          </div>`;
        return str;
      },
    },
    grid: {
      top: '30',
      left: '1%',
      right: '0',
      bottom: '0',
      containLabel: true
    },
    barMaxWidth: 14,
    xAxis: {
      type: 'value',
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      splitLine: {
        show: false,
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
      data: toJS(majorInfo.Axis)
    },
    series: [
      {
        name: '2012年',
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#FFBD3D',
            opacity: 0.6
          },
          emphasis: {
            color: '#FFBD3D',
            opacity: 1,
          }
        },
        data: toJS(majorInfo.data)
      }
    ]
  };
  return (
    <div>
      <Row>
        <Col width="6">
          <div className={styles['staff-box-block']}>
            <div className={styles['chart-title']}>毕业学校：</div>
            <BaseChart chartId="finishSchool" height="268px" option={finishSchoolOption} />
          </div>
        </Col>
        <Col width="6">
          <div className={styles['staff-box-block']}>
            <div className={styles['chart-title']}>所学专业（TOP5）</div>
            <BaseChart chartId="majorInfo" height="268px" option={majorInfoOption} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

RecruitmentInfo.propTypes = {
  finishSchool: PropTypes.object,
  majorInfo: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    module: '员工背景',
    error: !props.finishSchool.data.length && !props.majorInfo.data.length
  })
})(observer(RecruitmentInfo));
