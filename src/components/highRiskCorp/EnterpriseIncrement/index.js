import React from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { loadingComp } from 'components/hoc';
import loadingBoxHoc from '../common/loadingBoxHoc';
import Chart from 'components/common/Charts/ResizeChart';
import styles from './index.less';
function EnterpriseIncrement({highRiskCorpStore}) {
  const moduleData = highRiskCorpStore.enterpriseIncrement.data.blacklist_dist_list;
  const year = highRiskCorpStore.enterpriseIncrement.params.timeRange;
  const formatData = () => {
    const arr = [];
    moduleData.map(item => {
      arr[item.month - 1] = item.count;
    });
    return arr;
  };
  const chartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: params => {
        return `
        <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff"">
          <div style="color: #999999">${year}年${params[0].name}</div>
          <div style="color: #3f5869">增加${params[0].value}家</div>
        </div>`;
      }
    },
    grid: {
      left: '10px',
      right: '60px',
      bottom: '0px',
      top: '30px',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLine: {
        show: false,
        lineStyle: {
          color: '#999',
        }
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#999',
        }
      },
      axisTick: {
        show: false,
      },
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    },
    series: [
      {
        name: '高风险企业',
        type: 'bar',
        stack: '每月增量',
        barCategoryGap: '15px',
        itemStyle: {
          normal: {
            color: '#2f4554',
          }
        },
        data: formatData()
      },
    ],
  };
  return (
    <div>
      <div className={styles.iconBox}>
        <div className={styles.blackLine}>
          <span className={styles.blueIcon}></span><span>高风险企业</span>
        </div>
      </div>
      <Chart
        chartId="enterpriseIncrement"
        height="405"
        option={chartOption} />
    </div>
  );
}
export default inject('highRiskCorpStore')(
  loadingBoxHoc('enterpriseIncrement')(
    loadingComp({
      mapDataToProps: props => {
        const data = props.highRiskCorpStore.enterpriseIncrement.data;
        const NotCount = data.blacklist_dist_list && toJS(data.blacklist_dist_list).every((item) => {
          return item.count === 0;
        });
        return {
          loading: data.blacklist_dist_list === undefined ? true : false,
          error: data.error || NotCount,
          height: 434,
          errCategory: 1,
          category: 0,
        };
      },
    })(observer(EnterpriseIncrement))
  )
);
