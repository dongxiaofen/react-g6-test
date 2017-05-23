import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function Status({bannerStore, routing}) {
  const { monitorId, reportId } = routing.location.query;
  const monitorStatus = bannerStore.monitorStatus;
  const getNameAndConfig = () => {
    let reportName;
    if (monitorId) {
      reportName = '监控报告';
    }
    if (reportId) {
      reportName = '查询报告';
    }
    return reportName;
  };
  let leftType = '';
  if (monitorId && monitorStatus === 'MONITOR') {
    // 主体监控中
    leftType = (
      <div className={styles.bannerType}>
        <i className="fa fa-eye"></i>
        <span>正在监控中</span>
      </div>
    );
  } else if (monitorId && monitorStatus === 'EXPIRED') {
    // 主体监控已到期
    leftType = (
      <div className={styles.bannerType}>
        <i className="fa fa-eye-slash"></i>
        <span>监控已到期</span>
      </div>
    );
  } else if (monitorId && monitorStatus === 'PAUSE') {
    // 主体监控已暂停
    leftType = (
      <div className={styles.bannerType}>
        <i className="fa fa-eye-slash"></i>
        <span>监控已暂停</span>
      </div>
    );
  }
  const reportNames = getNameAndConfig();
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
