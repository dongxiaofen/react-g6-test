import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import CompanyScoreChart from './CompanyScoreChart/index';
import CompanyScoreList from './CompanyScoreList/index';
import BarLoading from 'components/common/BarLoading';
import { loadingComp } from '../../../hoc/index';

function ComprehenEval({ loaningStore }) {
  const sixStarData = loaningStore.sixStarData;
  let mainView = '';
  if (sixStarData.data) {
    mainView = (
      <div className={styles.content}>
        <CompanyScoreChart
          sixStarData={sixStarData} />
        <CompanyScoreList
          sixStarData={sixStarData} />
      </div>);
  } else {
    mainView = (
      <div className={styles.loadingBox}>
        <BarLoading />
      </div>
    );
  }
  return (
    <div>
      <p className={styles.title}>多维综合评价
        <span className={styles.timestamp}>（最近分析时间：{sixStarData.lastTm}）</span>
      </p>
      <div className={`${styles.box} clearfix`}>
        {mainView}
      </div>
    </div>
  );
}

ComprehenEval.propTypes = {
  loaningStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.loaningStore.loading === true ? true : false,
    category: 2,
    module: '六芒星',
    errCategory: 0,
    error: props.loaningStore.sixStarData.error
  }),
})(observer(ComprehenEval));
