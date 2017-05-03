import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function Status({bannerStore, routing}) {
  const {monitorId, companyType} = routing.location.query;
  const getNameAndConfig = () => {
    let reportName;
    if (companyType === 'MAIN') {
      if (monitorId) {
        reportName = '主体监控报告';
      } else {
        reportName = '高级查询报告';
      }
    } else if (companyType === 'FREE') {
      reportName = '快速查询报告';
    } else {
      reportName = '关联监控报告';
    }
    return reportName;
  };
  let leftType = '';
  if (monitorId && companyType === 'MAIN' && bannerStore.monitorStatus === 'MONITOR') {
    // 主体监控中
    leftType = (
      <div className={styles.bannerType + ' ' + styles.bannerTypeMain}>
        <i></i>
        <span>正在监控中</span>
      </div>
    );
  } else if (monitorId && companyType === 'MAIN' && bannerStore.monitorStatus === 'EXPIRED') {
    // 主体监控已到期
    leftType = (
      <div className={styles.bannerType + ' ' + styles.bannerTypeNone}>
        <i></i>
        <span>监控已到期</span>
      </div>
    );
  } else if (monitorId && companyType === 'MAIN' && bannerStore.monitorStatus === 'PAUSE') {
    // 主体监控已暂停
    leftType = (
      <div className={styles.bannerType + ' ' + styles.bannerTypeNone}>
        <i></i>
        <span>监控已暂停</span>
      </div>
    );
  } else if (monitorId && companyType === 'ASSOCIATE' && bannerStore.monitorStatus === 'MONITOR') {
    // 关联监控中
    leftType = (
      <div className={styles.bannerType + ' ' + styles.bannerTypeAssociate}>
        <i></i>
        <span>正在监控中</span>
      </div>
    );
  } else if (monitorId && companyType === 'ASSOCIATE' && bannerStore.monitorStatus === 'PAUSE') {
    // 关联监控中
    leftType = (
      <div className={styles.bannerType + ' ' + styles.bannerTypeAssociateNo}>
        <i></i>
        <span>监控已暂停</span>
      </div>
    );
  }
  const reportNames = getNameAndConfig(companyType, monitorId);
  return (
    <div className={`clearfix`}>
      {leftType}
      <div className={styles.reportType}>
        {`当前浏览为 ${reportNames}`}
      </div>
    </div>
  );
}

Status.propTypes = {
  bannerStore: PropTypes.object,
  routing: PropTypes.object,
};
export default inject('routing')(observer(Status));
