import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import CompanyName from './CompanyName';
import HistoryName from './HistoryName';
import RiskLabel from './RiskLabel';
import Industry from './Industry';
import Contact from './Contact';
import Status from './Status';
import Score from './Score';
// import ReportAction from './ReportAction';

function CompanyInfo({ bannerStore }) {
  return (
    <div className={`clearfix ${styles.companyBox}`}>
      <div className="clearfix">
        <CompanyName companyName={bannerStore.companyName} />
        <Score score={bannerStore.score.toString()} />
        <RiskLabel riskInfo={bannerStore.riskInfo} />
      </div>
      <div className={`clearfix ${styles.baseInfo}`}>
        <Industry industryNames={bannerStore.industryNames} />
        <Contact {...bannerStore} />
        <HistoryName {...bannerStore} />
      </div>
      <div className={`clearfix`}>
        <Status bannerStore={bannerStore} />
        {/* <ReportAction bannerStore={bannerStore} /> */}
      </div>
    </div>
  );
}

CompanyInfo.propTypes = {
  bannerStore: PropTypes.object,
};
export default inject('bannerStore')(observer(CompanyInfo));
