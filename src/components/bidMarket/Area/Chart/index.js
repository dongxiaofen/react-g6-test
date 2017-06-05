import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';
import bidMarketMapColor from 'helpers/bidMarketMapColor';

function Chart({ subText, groupInterval, params, cancels, mapName, area, setParams, setParamsCity }) {
  const _subText = params.province ? '分布区县' : '分布省市';
  const areaDataLength = area.data.length;
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
      roam: true,
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
  const switchMapOnClick = (item) => {
    if (cancels && cancels.length) {
      cancels.forEach((cancel) => {
        cancel();
      });
    }
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
  const dealWithGroupColor = () => {
    const output = [];
    const length = groupInterval.length / 2;
    let index = 0;
    for (let idx = 0; idx < length; idx++) {
      index = idx * 2;
      output.push(
        <div key={idx} className="clearfix" style={{ marginBottom: '10px' }}>
          <div
            className={styles['bidMarketMap-round']}
            style={{ backgroundColor: bidMarketMapColor[idx] }}></div>
          <div className={styles['bidMarketMap-round-text']}>
            {`${groupInterval[index]}-${groupInterval[index + 1]}家`}
          </div>
        </div>
      );
    }
    return output.reverse();
  };
  const bottomText = () => {
    if (areaDataLength) {
      return (
        <div className={styles['bidMarket-tips-block']}>
          <div className={styles['bidMarket-tips']}>
            <span>
              <i className="fa fa-exclamation-circle"
                style={{
                  marginLeft: '10px',
                  marginRight: '4px',
                  fontSize: '14px'
                }}></i>
              {
                params.province ?
                '点击图中高亮地区（区/县），查看该地区数据变化' :
                '注：可以使用鼠标滑轮进行图形缩放'
              }
            </span>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <div>
      <div className={styles['bidMarketMap-sub-title']}>
        {_subText + areaDataLength + '个' + subText}
      </div>
      {
        areaDataLength
          ? <div className={styles['bidMarketMap-interval']}>
              {dealWithGroupColor()}
            </div>
          : null
      }
      {bottomText()}
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
  subText: PropTypes.string,
  subCount: PropTypes.number,
  params: PropTypes.object,
  cancels: PropTypes.array,
  groupInterval: PropTypes.object,
  area: PropTypes.object,
  setParams: PropTypes.func,
  setParamsCity: PropTypes.func,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.areaLoading,
    category: 0,
    height: 500,
    error: props.area.data.length === 0 && props.subCount === 0,
    errCategory: 1,
  })
})(observer(Chart));
