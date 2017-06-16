import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import HistoryName from './HistoryName';
import RiskLabel from './RiskLabel';
import Industry from './Industry';
import Contact from './Contact';
import reportIcon from 'imgs/bannerInfo/report.png';
import loanIcon from 'imgs/bannerInfo/loan.png';
import monitorIcon from 'imgs/bannerInfo/monitor.png';
import nowRecordIcon from 'imgs/bannerInfo/nowRecord.png';

function CompanyInfo({ bannerStore, routing}) {
  const bannerInfoData = bannerStore.bannerInfoData;
  const createIcon = ()=> {
    const route = routing.location.pathname.split('/')[2];
    if (/comprehenEval|profitEval|operationEval|growthAbilityEval/.test(route)) {
      return loanIcon;
    } else if (/monitorTimeAxis|monitorAlert/.test(route)) {
      return monitorIcon;
    } else if (route === 'nowRecord') {
      return nowRecordIcon;
    }
    return reportIcon;
  };
  const featureIndustry = bannerInfoData.bannerInfo.featureIndustry;
  const industryType = featureIndustry && featureIndustry.result ? featureIndustry.result.industryType : [];
  return (
    <div className={`clearfix ${styles.companyBox}`}>
      <img src={createIcon()} className={styles.reportIcon}/>
      <div className={styles.baseInfoBox}>
        <div className="clearfix">
          <p className={styles.companyName}>{bannerInfoData.name}</p>
           <RiskLabel riskInfo={bannerInfoData.bannerInfo.bannerInfo.riskInfo} />
        </div>
        <div className={`clearfix ${styles.baseInfo}`}>
          <Industry industryNames={industryType} />
          <Contact {...bannerStore} />
          <HistoryName {...bannerStore} />
        </div>
      </div>
    </div>
  );
}

CompanyInfo.propTypes = {
  bannerStore: PropTypes.object,
};
export default inject('bannerStore', 'routing')(observer(CompanyInfo));
