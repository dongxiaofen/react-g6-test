import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';

function Footer({companyHomeStore, routing, bannerStore}) {
  const getReportType = ()=> {
    const route = routing.location.pathname.split('/')[2];
    if (/comprehenEval|profitEval|operationEval|growthAbilityEval/.test(route)) {
      return 'monitor';
    } else if (/monitorTimeAxis|monitorAlert/.test(route)) {
      return 'loan';
    } else if (companyHomeStore.reportInfo.reportId) {
      return 'report';
    }
    return 'basicReport';
  };
  const reportTypeDict = {monitor: '贷后监控', loan: '贷中分析', report: '贷前高级报告', 'basicReport': '贷前基础报告'};
  const repType = getReportType();
  // const reportInfo = companyHomeStore.reportInfo;
  return (
    <div className={styles.box}>
      <span className={styles.repType}>当前浏览为 {reportTypeDict[repType]}</span>
      {
        repType === 'monitor' ?
        <span className={styles.date}>（监控截止日期：2016-02-01）</span>
        : ''
      }
      <span className={styles.line}>|</span>
      {
        repType === 'basicReport' || repType === 'report' ?
        <span className={styles.item} onClick={bannerStore.refreshModal}>
          <i className={styles.update}></i>
          刷新报告
          <span className={styles.date}>（刷新日期：{bannerStore.reportDate}）</span>
        </span>
        : ''
      }
      {
        repType === 'basicReport' || repType === 'report' || repType === 'loan' ?
        <span className={styles.item}><i className={styles.download}></i>下载PDF</span>
        : ''
      }
      {
        repType === 'monitor' ?
        <span className={styles.item}><i className={styles.renewal}></i>监控续期</span>
        : ''
      }
      {
        repType === 'monitor' ?
        <span className={styles.item}><i className={styles.pause}></i>暂停监控</span>
        : ''
      }
    </div>
  );
}

Footer.propTypes = {
  foo: PropTypes.string,
};
export default inject('companyHomeStore', 'routing', 'bannerStore')(observer(Footer));
