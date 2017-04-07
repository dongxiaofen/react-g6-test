import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import CompanyName from './CompanyName';

function CompanyInfo({ companyHomeStore }) {
  return (
    <div className={styles.bannerInfoLeft}>
      <div className={`clearfix ${styles.companyBox}`}>
        <div className={styles.bannerInfoContent}>
          <CompanyName companyName={companyHomeStore.companyName} />
          {/* <HistoryName />
          <RiskLable /> */}
        </div>
      </div>

      {/* <Industry />
      <Contact />
      <Status />
      <ReportAction /> */}
    </div>
  );
}

CompanyInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('companyHomeStore')(observer(CompanyInfo));
