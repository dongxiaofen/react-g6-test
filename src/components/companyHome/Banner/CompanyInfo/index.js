import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import CompanyName from './CompanyName';
import HistoryName from './HistoryName';
import RiskLabel from './RiskLabel';
import Industry from './Industry';
import Contact from './Contact';
import Status from './Status';
import ReportAction from './ReportAction';

function CompanyInfo({ bannerStore }) {
  return (
    <div className={styles.bannerInfoLeft}>
      <div className={`clearfix ${styles.companyBox}`}>
        <div className={styles.bannerInfoContent}>
          <CompanyName companyName={bannerStore.companyName} />
          <HistoryName {...bannerStore} />
          <RiskLabel riskInfo={bannerStore.riskInfo} />
        </div>
        <div className={styles.bannerInfoContent}>
          <Industry industryNames={bannerStore.industryNames} />
          <Contact {...bannerStore} />
        </div>
        <div id="bannerLeftContent2" className={styles.bannerInfoContent}>
          <Status bannerStore={bannerStore} />
          <ReportAction bannerStore={bannerStore} />
        </div>
      </div>
    </div>
  );
}

CompanyInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('bannerStore')(observer(CompanyInfo));
