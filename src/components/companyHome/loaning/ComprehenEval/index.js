import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import CompanyScoreChart from './CompanyScoreChart/index';
import CompanyScoreList from './CompanyScoreList/index';
import { loadingComp } from '../../../hoc';

function ComprehenEval({ loaningStore }) {
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <CompanyScoreChart
          sixStarData={loaningStore.sixStarData} />
        <CompanyScoreList
          sixStarData={loaningStore.sixStarData} />
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
