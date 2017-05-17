import React from 'react';
import { observer, inject } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import loadingBoxHoc from '../common/loadingBoxHoc';
import Chart from 'components/common/Charts/ResizeChart';
import styles from './index.less';
import geoCoordMap from 'helpers/geoCoordMap';
const colors = ['#c6a9a0', '#78a186', '#55979f', '#2f4554', '#c23531'];
const min = 20;
const max = 35;
function AreaDistribute({highRiskCorpStore}) {
  const moduleData = highRiskCorpStore.areaDistribute.data.results;
  const setRangeMap = (rangeMax, range, index) => {
    if (range === 1) {
      return '0-500家';
    }
    const interval = Math.ceil(rangeMax / (range * 100)) * 100;
    const minRange = index * interval;
    const maxRange = minRange + interval;
    return `${minRange}-${maxRange}家`;
  };
  const getDataMinMax = () => {
    const data = moduleData.map(item => item.count);
    const dataMin = Math.min.apply(null, data);
    const dataMax = Math.max.apply(null, data);
    return {min: dataMin, max: dataMax};
  };
  const getRangeNum = (dataMax) => {
    let range;
    if (dataMax <= 500) {
      range = 1;
    } else if (dataMax <= 2000) {
      range = 3;
    } else {
      range = 5;
    }
    return range;
  };
  const createRangeMap = () => {
    const minMaxResult = getDataMinMax();
    const range = getRangeNum(minMaxResult.max);
    const output = [];
    for (let idx = range - 1; idx >= 0; idx--) {
      output.push(
        <div key={idx}>
          <span className={styles.icon} style={{backgroundColor: colors[idx]}}></span>
          {setRangeMap(minMaxResult.max, range, idx)}
        </div>
      );
    }
    return output;
  };
  const mapSymbolColor = (value) => {
    let color;
    const minMaxResult = getDataMinMax();
    if (minMaxResult.max <= 500) {
      color = colors[0];
    } else {
      const range = getRangeNum(minMaxResult.max);
      const interval = Math.ceil(minMaxResult.max / (range * 100)) * 100;
      color = colors[Math.floor(value / interval)];
    }
    return color;
  };
  const mapSymbolSize = (value) => {
    const minMaxResult = getDataMinMax();
    if (minMaxResult.min === minMaxResult.max) {
      return min;
    }
    return (value - minMaxResult.min) / (minMaxResult.max - minMaxResult.min) * (max - min) + min;
  };
  const formatData = () => {
    const arr = [];
    moduleData.forEach(item => {
      const coord = geoCoordMap[item.area];
      if (coord) {
        arr.push({
          name: item.area,
          value: coord.concat(item.count)
        });
      }
    });
    return arr;
  };
  const chartOption = {
    tooltip: {
      show: true,
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: params => {
        return `
        <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff"">
          <div style="color: #999999">${params.name}</div>
          <div style="color: #3f5869">${params.value[2]}家</div>
        </div>`;
      }
    },
    geo: {
      map: 'china',
      label: {
        normal: {
          show: false,
        },
        emphasis: {
          show: false,
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#E7E8EA',
          borderColor: '#ffffff',
        },
        emphasis: {
          areaColor: '#E7E8EA',
          borderColor: '#ffffff',
        }
      }
    },
    series: [
      {
        name: '高风险企业地域分布',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: formatData(),
        label: {
          normal: {
            show: true,
            formatter: '{b}',
            position: 'inside',
            textStyle: {
              color: '#333'
            },
          },
        },
        itemStyle: {
          normal: {
            color: params => {
              return mapSymbolColor(params.value[2]);
            }
          }
        },
        symbolSize: value => mapSymbolSize(value[2]),
      }
    ]
  };
  return (
    <div>
      <Chart
        chartId="areaDistribute"
        height="405"
        option={chartOption} />
      <div className={styles.rangeBox}>
        {createRangeMap()}
      </div>
    </div>
  );
}
export default inject('highRiskCorpStore')(
  loadingBoxHoc('areaDistribute')(
    loadingComp({
      mapDataToProps: props => ({
        loading: props.highRiskCorpStore.areaDistribute.data.results === undefined ? true : false,
        error: props.highRiskCorpStore.areaDistribute.data.error,
        height: 434,
        errCategory: 1,
        category: 0,
      }),
    })(observer(AreaDistribute))
  )
);
