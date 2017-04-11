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

function CompanyInfo({ companyHomeStore, ...queryParams }) {
  return (
    <div className={styles.bannerInfoLeft}>
      <div className={`clearfix ${styles.companyBox}`}>
        <div className={styles.bannerInfoContent}>
          <CompanyName companyName={companyHomeStore.companyName} />
          <HistoryName {...companyHomeStore} />
          <RiskLabel riskInfo={companyHomeStore.riskInfo} />
        </div>
        <div className={styles.bannerInfoContent}>
          <Industry industryNames={companyHomeStore.industryNames} />
          <Contact {...companyHomeStore} />
        </div>
        <div id="bannerLeftContent2" className={styles.bannerInfoContent}>
          <Status companyHomeStore={companyHomeStore} {...queryParams} />
          <ReportAction companyHomeStore={companyHomeStore} {...queryParams} />
        </div>
      </div>
    </div>
  );
}

CompanyInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('companyHomeStore')(observer(CompanyInfo));
