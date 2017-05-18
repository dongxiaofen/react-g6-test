import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
// import CompanyScoreChart from './CompanyScoreChart';
import CompanyScoreList from './CompanyScoreList';
// import { loadingComp } from 'components/hoc';

function CompanyScore({alertAnalysisStore}) {
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        {/* <CompanyScoreChart
          alertAnalysisStore={alertAnalysisStore} /> */}
        <CompanyScoreList
          alertAnalysisStore={alertAnalysisStore} />
      </div>
    </div>
  );
}

CompanyScore.propTypes = {
  alertAnalysisStore: PropTypes.object,
};
export default observer(CompanyScore);
// export default loadingComp({
//   mapDataToProps: props => ({
//     loading: props.alertAnalysisStore.loading === true ? true : false,
//     category: 2,
//     module: '六芒星',
//     errCategory: 0,
//     error: props.alertAnalysisStore.sixStarData.error
//   }),
// })(observer(CompanyScore));
