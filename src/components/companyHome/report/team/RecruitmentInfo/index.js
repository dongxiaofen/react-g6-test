import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Popover from 'antd/lib/popover';
import noDataImg from 'imgs/loading/noDataChart.png';

import styles from './index.less';
import { Row } from 'components/common/layout';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';

function RecruitmentInfo({ teamStore }) {
  const wageScaleOption = {
    tooltip: {
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: (ticket) => {
        const str = `
        <div style="box-shadow: 0 0 7px #ddd; padding: 15px 20px; background-color: #fff">
          <p style="text-align: center;">
            <a style="color:#43BF77;">
              ${ticket.name}：${ticket.value}%
            </a>
          </p>
        </div>`;
        return str;
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['46%', '56%'],
        center: ['50%', '65%'],
        avoidLabelOverlap: true,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#9d9d9d',
              fontSize: 13,
            },
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: '#9D9D9D'
            }
          },
        },
        data: toJS(teamStore.wageScale),
      }
    ],
  };

  const recruitment = teamStore.recruitment;
  const recruitmentOption = {
    dataZoom: [
      {
        type: 'slider',
        dataBackground: {
          areaStyle: {
            color: '#eee'
          },
        },
        fillerColor: 'rgba(230, 230, 230, 0.4)',
        handleStyle: {
          color: '#ddd'
        },
      },
      {
        type: 'inside',
      },
    ],
    tooltip: {
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: (ticket) => {
        const str = `
                <div style="box-shadow: 0 0 7px #ddd; padding: 15px 20px; background-color: #fff">
                  <p style="text-align: center;">
                    <a style="color:#3483E9;">
                      ${ticket.name}：${ticket.value}%
                    </a>
                  </p>
                </div>`;
        return str;
      },
    },
    grid: {
      top: '10%',
      left: '0',
      right: '4%',
      bottom: '45',
      containLabel: true
    },
    barMaxWidth: 30,
    xAxis: {
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
        },
      },
      axisLabel: {
        textStyle: {
          color: '#999999',
        },
      },
      data: toJS(recruitment.Axis)
    },
    yAxis: {
      type: 'value',
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
    series: [
      {
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#C0DDFF',
          },
          emphasis: {
            color: '#3483E9',
          }
        },
        data: toJS(recruitment.data)
      }
    ]
  };

  const companyInfoList = () => {
    const content = [];
    const init = [
      { title: '公司规模：', key: 'scale' },
      { title: '办公地点：', key: 'location' },
      { title: '招聘平均薪资：', key: 'salaryAvg' },
      { title: '平均工作经验：', key: 'workingYearsAvg' },
      { title: '招聘学历要求：', key: 'degreeInfo' },
    ];
    const locationComp = (value) => {
      return <div className={styles.itemKeyData}>{value}</div>;
    };
    init.forEach((item, key) => {
      const itemKeyData = teamStore.companyInfo[item.key];
      content.push(
        <div key={key} className={`clearfix ${styles['info1-box-block']}`}>
          <div className={styles['info1-box-title']}>
            {item.title}
          </div>
          {
            item.key === 'location'
            ?
            <Popover content={locationComp(itemKeyData)}>
              <div className={styles['info1-box-content']}>
                {itemKeyData}
              </div>
            </Popover>
            :
            <div className={styles['info1-box-content']}>
              {teamStore.companyInfo[item.key]}
            </div>
          }
        </div>
      );
    });
    return (
      <div className={styles['rm-info1']}>
        <div className={styles['rm-info1-box']}>
          {content}
        </div>
      </div>
    );
  };

  const similarCompanyAvgSalary = teamStore.similarCompanyAvgSalary;
  return (
    <div>
      <Row>
        {companyInfoList()}
        <div className={styles['rm-info2']}>
          <div className={styles['rm-info2-box']}>
            <div className={styles['chart-title']}>企业招聘薪资比例：</div>
            {teamStore.wageScale && teamStore.wageScale.length > 0 ? <BaseChart chartId="wageScale" height="268px" option={wageScaleOption} /> : <div className={styles.noData}>
              <div className={styles.noDataContent}>
                <div className={styles.noDataBox}>
                  <div className={styles.noDataImg}>
                    <img alt="" src={noDataImg} />
                  </div>
                  <div className={styles.noDataText}>
                    暂无信息
                  </div>
                </div>
              </div>
            </div>}
            {
              similarCompanyAvgSalary
              ?
                <div className={styles['chart-title-sub']}>(全国招聘薪资平均为{similarCompanyAvgSalary})</div>
              : null
            }
          </div>
        </div>
        <div className={styles['rm-info3']}>
          <div className={styles['rm-info3-box']}>
            <div className={styles['chart-title']}>招聘岗位分布：</div>
            <BaseChart chartId="recruitment" height="268px" option={recruitmentOption} />
          </div>
        </div>
      </Row>
    </div>
  );
}

RecruitmentInfo.propTypes = {
  teamStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => {
    const teamStore = props.teamStore;
    const companyInfo = teamStore.dealWithObjectToArray(teamStore.companyInfo);
    const isNotData = !companyInfo.every((item) => item === '暂无信息') || Object.keys(companyInfo).length === 0;
    const isError = isNotData
      && !teamStore.wageScale.length
      && !teamStore.recruitment.data.length;
    return {
      loading: teamStore.isLoading,
      error: isError,
      module: '招聘信息'
    };
  }
})(observer(RecruitmentInfo));
