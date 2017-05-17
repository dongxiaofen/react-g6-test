import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';

function Chart({ params, mapName, area, setParams, setParamsCity }) {
  const switchMapOnClick = (item) => {
    const _params = toJS(params);
    if (item.componentType === 'series') {
      const layer = item.value[4];
      if (layer === 2) {
        _params.city = item.name;
        setParamsCity(_params);
      } else {
        _params.province = item.name;
        _params.city = '';
        setParams(_params);
      }
    }
  };
  const option = {
    tooltip: {
      backgroundColor: '#ffffff',
      padding: [0, 0],
      textStyle: {
        color: '#4d4d4d',
      },
      formatter: (ticket) => {
        const str = `
          <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff"">
            <p style="text-align: center;">
              <a style="color:#333;">
                ${ticket.name}
              </a>
            </p>
            <p style="text-align: center;">
              <a style="color: #333;">
                <span>
                  共 ${ticket.value[2]} 家
                </span>
              </a>
            </p>
            <p style="text-align: center;">
              <a style="color: #333;">
                <span>
                  中标金额 ${ticket.value[3]} 万元
                </span>
              </a>
            </p>
          </div>`;
        return str;
      }
    },
    geo: {
      map: mapName,
      label: {
        emphasis: {
          show: false,
        }
      },
      layoutCenter: ['50%', '60%'],
      layoutSize: '80%',
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
        symbolSize: 20,
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
        data: toJS(area.data)
      },
    ]
  };
  return (
    <div className={styles}>
      <BaseChart
        chartId="bidMarketArea"
        height="500px"
        option={option}
        clickAction={switchMapOnClick} />
    </div>
  );
}

Chart.propTypes = {
  areaLoading: PropTypes.bool,
  mapName: PropTypes.string,
  params: PropTypes.object,
  area: PropTypes.object,
  setParams: PropTypes.func,
  setParamsCity: PropTypes.func,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.areaLoading,
    category: 0,
    height: 500,
    error: false,
    errCategory: 1,
  })
})(observer(Chart));
