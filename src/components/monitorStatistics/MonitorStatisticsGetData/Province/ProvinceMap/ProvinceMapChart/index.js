import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Popover from 'antd/lib/popover';

import styles from './index.less';
import MapChart from 'components/common/Charts/MapChart';
import { loadingComp } from 'components/hoc';

function ProvinceMapChart({ msStore }) {
  const rankList = (provinceRank) => {
    const output = [];
    let listTop;
    const length = provinceRank.length < 10 ? provinceRank.length : 10;
    for (let idx = 0; idx < length; idx++) {
      if (idx === 0 || idx === 1 || idx === 2) {
        listTop = <div className={styles.rankListTitleTop}>{idx + 1}</div>;
      } else {
        listTop = <div className={styles.rankListTitle}>{idx + 1}</div>;
      }
      const title = `${provinceRank[idx].area}（${provinceRank[idx].companyCount}家）`;
      output.push(
        <li className={'clearfix'} key={idx}>
          {listTop}
           <div className={styles.rankListContent}>
            <Popover content={title}>
              <span>{title}</span>
             </Popover>
          </div>
        </li>
      );
    }
    return output;
  };

  const mapOption = msStore.provinceMap.mapOption;

  const option = {
    tooltip: {
      trigger: 'item',
      axisPointer: {
        lineStyle: {
          color: '#e5e5e5',
        }
      },
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: (ticket) => {
        let str = '';
        if (ticket.value) {
          str = `
              <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff">
                <p style="text-align: center;">
                  <a style="color:#999999;">
                    ${ticket.name}
                  </a>
                  <a style="color: #a5d6a7;">
                    <span style="padding-left: 15px">
                      ${ticket.value}
                    </span>家
                  </a>
                </p>
              </div>`;
        }
        return str;
      },
    },
    series: [
      {
        type: 'map',
        mapType: mapOption.mapType,
        label: {
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
          },
        },
        data: toJS(mapOption.data),
      }
    ]
  };
  const provinceMapUndefined = msStore.provinceMapUndefined;
  return (
    <div className={`clearfix ${styles.rankBG}`}>
      <div>
        <ul className={styles.rankList}>
          {rankList(msStore.provinceMap.provinceRank)}
        </ul>
        <div className={styles.rankChart}>
          <MapChart
            chartId="ProvinceMapChart"
            option={option}
            height="330px"
          />
          {
            provinceMapUndefined
              ?
              <div className={`clearfix ${styles.rankChartText}`}>
                <div></div>
                <span>其中有{provinceMapUndefined}家企业地区未知，暂未统计</span>
              </div>
              : null
          }
        </div>
      </div>
    </div>
  );
}

ProvinceMapChart.propTypes = {
  msStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.msStore.loadingGroup.province,
    category: 0,
    height: 330,
    error: props.msStore.provinceMap.mapOption.data.length === 0,
    errCategory: 1,
  })
})(observer(ProvinceMapChart));
