import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
// import Popover from 'components/lib/popover';
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
      output.push(
        <li className={'clearfix'} key={idx}>
          {listTop}
          {/* <div className={styles.rankListContent}>
            <Popover content={`${provinceRank[idx].area}（${provinceRank[idx].companyCount}家）`}>
              <span>{`${provinceRank[idx].area}（${provinceRank[idx].companyCount}家）`}</span>
            </Popover>
          </div> */}
           <div className={styles.rankListContent}>
            <span>{`${provinceRank[idx].area}（${provinceRank[idx].companyCount}家）`}</span>
          </div>
        </li>
      );
    }
    return output;
  };

  return (
    <div className={styles.rankBG}>
      <div>
        <ul className={styles.rankList}>
          {rankList(msStore.provinceMap.provinceRank)}
        </ul>
        <div className={styles.rankChart}>
          <MapChart
            chartId="ProvinceMapChart"
            option={msStore.provinceMap.chartOption}
            height="330px"
          />
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
    error: !props.msStore.isEmptyObject('errorBody', 'province') || !props.msStore.provinceMap.result.length,
    errCategory: 1,
  })
})(observer(ProvinceMapChart));
