import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function Status({bannerStore, routing}) {
  const { monitorId, reportId, analysisReportId, companyType } = routing.location.query;
  const monitorStatus = bannerStore.monitorStatus;
  const getNameAndConfig = () => {
    let reportName;
    if (companyType === 'MAIN') {
      if (monitorId) {
        reportName = '主体监控报告';
      }
      if (reportId) {
        reportName = '高级查询报告';
      }
      if (analysisReportId) {
        reportName = '深度分析报告';
      }
    } else if (companyType === 'FREE') {
      reportName = '快速查询报告';
    } else {
      reportName = '关联监控报告';
    }
    return reportName;
  };
  let leftType = '';
  if (monitorId && companyType === 'MAIN' && monitorStatus === 'MONITOR') {
    // 主体监控中
    leftType = (
      <div className={styles.bannerType}>
        <i className="fa fa-flag"></i>
        <span>正在监控中</span>
      </div>
    );
  } else if (monitorId && companyType === 'MAIN' && monitorStatus === 'EXPIRED') {
    // 主体监控已到期
    leftType = (
      <div className={styles.bannerType}>
        <i className="fa fa-flag-o"></i>
        <span>监控已到期</span>
      </div>
    );
  } else if (monitorId && companyType === 'MAIN' && monitorStatus === 'PAUSE') {
    // 主体监控已暂停
    leftType = (
      <div className={styles.bannerType}>
        <i className="fa fa-flag-o"></i>
        <span>监控已暂停</span>
      </div>
    );
  } else if (monitorId && companyType === 'ASSOCIATE' && monitorStatus === 'MONITOR') {
    // 关联监控中
    leftType = (
      <div className={styles.bannerType}>
        <i className="fa fa-flag"></i>
        <span>正在监控中</span>
      </div>
    );
  } else if (monitorId && companyType === 'ASSOCIATE' && monitorStatus === 'PAUSE') {
    // 关联监控中
    leftType = (
      <div className={styles.bannerType}>
        <i className="fa fa-flag-o"></i>
        <span>监控已暂停</span>
      </div>
    );
  } else if (monitorId && companyType === 'ASSOCIATE' && monitorStatus === 'EXPIRED') {
    leftType = (
      <div className={styles.bannerType}>
        <i className="fa fa-flag-o"></i>
        <span>监控已到期</span>
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
