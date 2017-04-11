import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Status({companyHomeStore, monitorId, companyType}) {
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
  if (monitorId && companyType === 'MAIN' && companyHomeStore.monitorStatus === 'MONITOR') {
    // 主体监控中
    leftType = (
      <div className={styles.bannerType + ' ' + styles.bannerTypeMain}>
        <i></i>
        <span>正在监控中</span>
      </div>
    );
  } else if (monitorId && companyType === 'MAIN' && companyHomeStore.monitorStatus === 'EXPIRED') {
    // 主体监控已到期
    leftType = (
      <div className={styles.bannerType + ' ' + styles.bannerTypeNone}>
        <i></i>
        <span>监控已到期</span>
      </div>
    );
  } else if (monitorId && companyType === 'MAIN' && companyHomeStore.monitorStatus === 'PAUSE') {
    // 主体监控已暂停
    leftType = (
      <div className={styles.bannerType + ' ' + styles.bannerTypeNone}>
        <i></i>
        <span>监控已暂停</span>
      </div>
    );
  } else if (monitorId && companyType === 'ASSOCIATE' && companyHomeStore.monitorStatus === 'MONITOR') {
    // 关联监控中
    leftType = (
      <div className={styles.bannerType + ' ' + styles.bannerTypeAssociate}>
        <i></i>
        <span>正在监控中</span>
      </div>
    );
  } else if (monitorId && companyType === 'ASSOCIATE' && companyHomeStore.monitorStatus === 'PAUSE') {
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
    <div>
      {leftType}
      <div className={styles.reportType}>
        {`(您当前的版本为 ${reportNames})`}
      </div>
    </div>
  );
}

Status.propTypes = {
  foo: PropTypes.string,
};
export default observer(Status);
