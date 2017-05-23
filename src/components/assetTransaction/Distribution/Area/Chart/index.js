import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import styles from './index.less';
import BaseChart from 'components/common/Charts/BaseChart';
import { loadingComp } from 'components/hoc';

function Chart({ distributionStaticKey, distributionMapData, params, setParams, mapSymbol, getAreaDistributionDetail }) {
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
              <br>
              <a style="color: ${ticket.color};">
              占比：<span style="padding-left: 15px">
                ${ticket.value[3]}%
              </span>
              </a>
              <br>
              <a style="color: ${ticket.color};">
                ${ticket.value[4]}<span style="padding-left: 15px">
                  ${ticket.value[2]}
                </span>${ticket.value[5]}
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
      layoutSize: '100%',
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
        symbolSize: mapSymbol.bind(null, distributionStaticKey),
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
        data: toJS(distributionMapData)
      },
    ]
  };

  const backgroundColor = ['#C13430', '#2F4554', '#55979F', '#779F85'];
  const ruleMoney = ['30000万以上', '20000万 ~ 29999万', '10000万 ~ 19999万', '0 ~ 9999万'];
  const ruleSum = ['500笔以上', '200笔 ~ 499笔', '10笔 ~ 199笔', '0 ～ 9笔'];
  const mapRuleData = distributionStaticKey === 'transactionSum' || distributionStaticKey === 'auctionSum' ? ruleSum : ruleMoney;
  const mapRule = mapRuleData.map((item, key) => {
    return (
      <li key={`areaDistributionRoundKey${key}`}>
        <div style={{ backgroundColor: backgroundColor[key] }}></div>
        {item}
      </li>
    );
  });
  const mapClick = (data) => {
    const _params = toJS(params);
    _params.region = data.name;
    setParams(_params);
    getAreaDistributionDetail(_params);
  };
  return (
    <div>
      <ul className={styles.mapRule}>
        {mapRule}
      </ul>
      <BaseChart
        chartId="distributionMap"
        height="680px"
        option={option}
        clickAction={mapClick}/>
    </div>
  );
}

Chart.propTypes = {
  loading: PropTypes.bool,
  distributionStaticKey: PropTypes.string,
  params: PropTypes.object,
  distributionMapData: PropTypes.object,
  mapSymbol: PropTypes.func,
  setParams: PropTypes.func,
  getAreaDistributionDetail: PropTypes.func,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.loading,
    category: 0,
    height: 680,
    error: props.distributionMapData.length === 0,
    errCategory: 1,
  })
})(observer(Chart));
