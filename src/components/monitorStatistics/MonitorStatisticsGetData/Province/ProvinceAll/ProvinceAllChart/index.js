import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import styles from './index.less';
import MapChart from 'components/common/Charts/MapChart';
import { loadingComp } from 'components/hoc';

function ProvinceAllChart({ msStore }) {
  const dateOnClick = (chartData) => {
    if (chartData.componentSubType === 'scatter') {
      const params = msStore.params;
      params.province = chartData.name;
      msStore.getProvince({params});
      msStore.setProvinceName(chartData.name);
    }
  };

  const provinceAll = msStore.provinceAll;

  const option = {
    tooltip: {
      backgroundColor: '#ffffff',
      padding: [0, 0],
      textStyle: {
        color: '#4d4d4d',
      },
      formatter: (ticket) => {
        const str = `
          <div style="box-shadow: 0 0 4px #ccc; padding: 10px 20px;">
            <p style="text-align: center;">
              <a style="color:#999999;">
                ${ticket.name}
              </a>
              <a style="color: ${ticket.color};">
                <span style="padding-left: 15px">
                  ${ticket.value[2]}
                </span>家
              </a>
            </p>
          </div>`;
        return str;
      }
    },
    geo: {
      map: 'china',
      label: {
        emphasis: {
          show: false,
        }
      },
      layoutCenter: ['50%', '50%'],
      layoutSize: '130%',
      itemStyle: {
        normal: {
          areaColor: '#E7E8EA',
          borderColor: '#ffffff',
        },
        emphasis: {
          areaColor: '#E7E8EA',
          borderColor: '#ffffff',
        },
      },
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: (data) => {
          const value = data[2];
          if (value >= 1 && value <= 10) {
            return 20;
          } else if (value >= 11 && value <= 20) {
            return 25;
          } else if (value >= 21 && value <= 50) {
            return 30;
          }
          return 40;
        },
        label: {
          normal: {
            formatter: '{b}',
            position: 'inside',
            show: true,
            textStyle: {
              color: '#333333',
            }
          },
        },
        data: toJS(provinceAll)
      },
    ]
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.tip2}>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.round1}></div>
          <div className={styles.tipText}>大于50家</div>
        </div>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.round2}></div>
          <div className={styles.tipText}>21-50家</div>
        </div>
        <div className={`clearfix ${styles.mb10}`}>
          <div className={styles.round3}></div>
          <div className={styles.tipText}>11-20家</div>
        </div>
        <div className={`clearfix`}>
          <div className={styles.round4}></div>
          <div className={styles.tipText}>1-10家</div>
        </div>
      </div>
      <MapChart
        chartId="ProvinceAllChart"
        option={option}
        height="400px"
        clickAction={dateOnClick}
        />
    </div>
  );
}

ProvinceAllChart.propTypes = {
  chartOption: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.msStore.loadingGroup.provinceAll,
    category: 0,
    height: 400,
    error: props.msStore.provinceAll.length === 0,
    errCategory: 1,
  })
})(observer(ProvinceAllChart));
