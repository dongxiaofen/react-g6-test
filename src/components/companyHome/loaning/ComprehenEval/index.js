import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import CompanyScoreChart from './CompanyScoreChart/index';
import CompanyScoreList from './CompanyScoreList/index';
import { loadingComp } from 'components/hoc';

function ComprehenEval({ alertAnalysisStore }) {
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <CompanyScoreChart
          sixStarData={alertAnalysisStore.sixStarData} />
        <CompanyScoreList
          sixStarData={alertAnalysisStore.sixStarData} />
      </div>
    </div>
  );
}

ComprehenEval.propTypes = {
  alertAnalysisStore: PropTypes.object,
};
// export default observer(CompanyScore);
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.alertAnalysisStore.loading === true ? true : false,
    category: 2,
    module: '六芒星',
    errCategory: 0,
    error: props.alertAnalysisStore.sixStarData.error
  }),
})(observer(ComprehenEval));
