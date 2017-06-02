import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import CompanyScoreChart from './CompanyScoreChart';
import CompanyScoreList from './CompanyScoreList';
import { loadingComp } from 'components/hoc';

function CompanyScore({alertAnalysisStore}) {
  let dom = '';
  // if (!alertAnalysisStore.sixStarData) {
  //   dom = (
  //     <div className={styles.box}>
  //       <div className={styles.loadingWrap}>
  //         <div className={styles.loading}>
  //         </div>
  //       </div>
  //       {/* <div className={styles.loadingWrap}>
  //         loading
  //       </div> */}
  //     </div>
  //   );
  // } else if (alertAnalysisStore.sixStarData.error) {
  //   dom = (
  //     <div className={styles.noMessage}>
  //       <div className={styles.msgCon}>
  //         <div className={styles.msgImg}></div>
  //         <div className={styles.msgText}>企业综合评分暂无数据</div>
  //       </div>
  //     </div>
  //   );
  // } else {
  //   dom = (
  //     <div className={styles.box}>
  //       <div className={styles.content}>
  //         <CompanyScoreChart
  //           sixStarData={alertAnalysisStore.sixStarData} />
  //         <CompanyScoreList
  //           sixStarData={alertAnalysisStore.sixStarData} />
  //       </div>
  //     </div>
  //   );
  // }
  dom = (
    <div className={styles.box}>
      <div className={styles.content}>
        <CompanyScoreChart
          sixStarData={alertAnalysisStore.sixStarData} />
        <CompanyScoreList
          sixStarData={alertAnalysisStore.sixStarData} />
      </div>
    </div>
  );
  return dom;
}

CompanyScore.propTypes = {
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
})(observer(CompanyScore));
