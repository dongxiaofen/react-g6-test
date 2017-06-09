import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
// import HistoryName from './HistoryName';
import RiskLabel from './RiskLabel';
import Industry from './Industry';
import Contact from './Contact';
// import Status from './Status';
// import Score from './Score';
// import ReportAction from './ReportAction';
import reportIcon from 'imgs/bannerInfo/report.png';
import loanIcon from 'imgs/bannerInfo/loan.png';
import monitorIcon from 'imgs/bannerInfo/monitor.png';

function CompanyInfo({ bannerStore, routing}) {
  const bannerInfoData = bannerStore.bannerInfoData;
  const createIcon = ()=> {
    const route = routing.location.pathname.split('/')[2];
    if (/comprehenEval|profitEval|operationEval|growthAbilityEval/.test(route)) {
      return loanIcon;
    } else if (/monitorTimeAxis|monitorAlert/.test(route)) {
      return monitorIcon;
    }
    return reportIcon;
  };
  return (
    <div className={`clearfix ${styles.companyBox}`}>
      <div className="clearfix">
        <img src={createIcon()} className={styles.reportIcon}/>
        <div className={styles.baseInfoBox}>
          <div className="clearfix">
            <p className={styles.companyName}>{bannerInfoData.name}</p>
             <RiskLabel riskInfo={bannerInfoData.bannerInfo.bannerInfo.riskInfo} />
          </div>
          <div className={`clearfix ${styles.baseInfo}`}>
            <Industry industryNames={bannerInfoData.bannerInfo.featureIndustry.result.industryType} />
            <Contact {...bannerStore} />
            {/* <HistoryName {...bannerStore} />*/}
          </div>
        </div>
        <div>
          升级报告
        </div>
      </div>
      <div className={`clearfix`}>
        {/* <Status bannerStore={bannerStore} /> s*/}
        {/* <ReportAction bannerStore={bannerStore} /> */}
      </div>
    </div>
  );
}

CompanyInfo.propTypes = {
  bannerStore: PropTypes.object,
};
export default inject('bannerStore', 'routing')(observer(CompanyInfo));
