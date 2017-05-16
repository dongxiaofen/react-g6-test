import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';
import ErrorText from 'components/common/ErrorText';

function Chart({ rank, tabSwitchIndex, setSwitchTab }) {
  const switchConfig = [
    { title: '中标单位', key: 'winners' },
    { title: '招标单位', key: 'purchasers' },
    { title: '招标代理机构', key: 'agents' },
  ];
  const option = {
    barMaxWidth: 7,
    grid: {
      top: 70,
      left: '1%',
      right: '10%',
      bottom: 0,
      containLabel: true
    },
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
      data: toJS(rank.axis)
    },
    series: [
      {
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#568666',
          },
        },
        label: {
          normal: {
            show: true,
            position: [5, 10],
            formatter: (ticket) => {
              return ticket.data.name;
            }
          }
        },
        data: toJS(rank.data)
      }
    ]
  };
  const errorConfig = {
    height: 500,
    error: true,
    errCategory: 1
  };
  const tabSwitchOnClick = (key) => {
    setSwitchTab(key);
  };
  return (
    <div className={styles.wrap}>
      <div className={styles['bar-tab']}>
        <div className={`clearfix ${styles['bar-tab-switch']}`}>
          {
            switchConfig.map((item, key) => {
              return (
                <div
                  key={`bidMarketRankSwitchKey${key}`}
                  className={`${styles['bar-tab-switch-item']} ${tabSwitchIndex === item.key ? styles['switch-active'] : ''}`}>
                  <div onClick={tabSwitchOnClick.bind(null, item.key)}>{item.title}</div>
                  <div className={styles['bar-tab-bottom-border']}></div>
                </div>
              );
            })
          }
        </div>
      </div>
      {
        rank.data.length
          ? <BaseChart chartId="bidMarketRank" height="500px" option={option} />
          : <ErrorText {...errorConfig} />
      }
    </div>
  );
}

Chart.propTypes = {
  tabSwitchIndex: PropTypes.string,
  rankLoading: PropTypes.bool,
  rank: PropTypes.object,
  setSwitchTab: PropTypes.func,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.rankLoading,
    category: 0,
    height: 500,
    error: props.rank.winners.length === 0 && props.rank.purchasers.length === 0 && props.rank.agents.length === 0,
    errCategory: 1,
  })
})(observer(Chart));
