import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import CompanyScoreChart from './CompanyScoreChart';
import CompanyScoreList from './CompanyScoreList';

function CompanyScore({}) {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        企业综合评分
      </div>
      <div className={styles.content}>
        <CompanyScoreChart />
        <CompanyScoreList />
      </div>
    </div>
  );
}

CompanyScore.propTypes = {
  alertAnalysisStore: PropTypes.object,
};
export default observer(CompanyScore);
