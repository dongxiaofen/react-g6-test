import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';

function Footer({companyHomeStore, routing, bannerStore}) {
  const reportTypeDict = {monitor: '贷后监控', loan: '贷中分析', report: '贷前高级报告', 'basicReport': '贷前基础报告', 'nowRecord': '现勘记录'};
  const {reportId} = companyHomeStore.reportInfo;
  const {monitorStatus} = bannerStore.monitorRepInfo;
  const getReportType = ()=> {
    const route = routing.location.pathname.split('/')[2];
    if (/comprehenEval|profitEval|operationEval|growthAbilityEval/.test(route)) {
      return 'loan';
    } else if (/monitorTimeAxis|monitorAlert/.test(route)) {
      return 'monitor';
    } else if (route === 'nowRecord') {
      return 'nowRecord';
    } else if (reportId !== '') {
      return 'report';
    }
    return 'basicReport';
  };
  const pauseOrRestart = ()=> {
    if (bannerStore.reStoreLoading) {
      return false;
    }
    if (monitorStatus === 'MONITOR') {
      bannerStore.pauseOrRestoreMonitorModal();
    } else {
      bannerStore.pauseOrRestoreMonitorConfirm();
    }
  };
  const monitorCss = () => {
    return monitorStatus === 'PAUSE' && bannerStore.reStoreLoading ? 'anticon anticon-spin anticon-loading' : styles.pause;
  };
  const repType = getReportType();
  return (
    <div className={styles.box}>
      <span className={styles.repType}>当前浏览为 {reportTypeDict[repType]}</span>
      {
        repType === 'monitor' ?
        <span className={styles.date}>（监控截止日期：{bannerStore.monitorRepInfo.expireDt}）</span>
        : ''
      }
      {
        repType === 'nowRecord' ? ''
        : <span className={styles.line}>|</span>
      }
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
        (repType === 'basicReport' || repType === 'report' || repType === 'loan') && companyHomeStore.completed ?
        <span className={styles.item} onClick={bannerStore.openDownLoadPdf}>
          <i className={styles.download}></i>下载PDF
        </span>
        :
        <span className={styles.item}>
          请稍后...
        </span>
      }
      {
        repType === 'monitor' ?
        <span className={styles.item} onClick={bannerStore.renewalMonitorModal}>
          <i className={styles.renewal}></i>监控续期
        </span>
        : ''
      }
      {
        repType === 'monitor' && monitorStatus !== 'EXPIRED' ?
        <span className={styles.item} onClick={pauseOrRestart}>
          <i className={monitorCss()}></i>
          {monitorStatus === 'MONITOR' ? '暂停监控' : '恢复监控'}
        </span>
        : ''
      }
    </div>
  );
}

Footer.propTypes = {
  foo: PropTypes.string,
};
export default inject('companyHomeStore', 'routing', 'bannerStore')(observer(Footer));
