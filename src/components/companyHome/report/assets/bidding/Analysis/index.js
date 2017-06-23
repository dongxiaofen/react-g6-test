import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report/';
import Chart from './Chart';
import styles from './index.less';

function Analysis({ assetsStore }) {
  const menuActive = (text) => {
    if (text === assetsStore.biddingAnalysisActive) {
      return styles.menuTitleActive;
    }
    return '';
  };

  const menuChange = (value) => {
    assetsStore.updateValue('biddingAnalysisActive', value);
  };

  return (
    <div>
      <div className="clearfix">
        <div className={styles.title}>
          <ModuleTitle module="招投标分析图" />
        </div>
        <div className={`cleafix ${styles.menu}`}>
          <div className={`${styles.menuTitle} ${menuActive('年度')}`} onClick={menuChange.bind(null, '年度')}>年度</div>
          <div className={`${styles.menuTitle} ${menuActive('季度')}`} onClick={menuChange.bind(null, '季度')}>季度</div>
          <div className={`${styles.menuTitle} ${menuActive('月度')}`} onClick={menuChange.bind(null, '月度')}>月度</div>
        </div>
      </div>
      <Chart biddingData={assetsStore.biddingData} />
    </div>
  );
}

Analysis.propTypes = {
  assetsStore: PropTypes.object,
};
export default observer(Analysis);
