import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function MonitorStatus({ nodeData, monitorInfoList, routing }) {
  const monitorId = routing.location.query.monitorId;
  const viewMonitor = (id, type = 'MAIN') => {
    location.href = `/companyHome?monitorId=${id}&companyType=${type}`;
  };
  const viewReport = (reportId, type) => {
    location.href = type === 'MAIN' ? `/companyHome?reportId=${reportId}&companyType=${type}` : `/companyHome?companyName=${reportId}&companyType=${type}`;
  };
  const getMonitorStatus = () => {
    let output;
    if (nodeData.cateType === 2) {
      output = '';
    } else if (monitorInfoList.findIndex((item) => item.companyName === nodeData.name) < 0) {
      output = (
        <div>
          {
            monitorId ?
              <div className={styles.actionBox}>
                <a onClick={viewReport.bind(this, nodeData.name, 'FREE')} className={styles.actionFlow}>
                  查看主页
              </a>
                <a onClick={this.handleCreateMonitor} className={styles.actionFlow}>
                  关联监控
              </a>
              </div> :
              <div className={styles.actionBox}>
                <a onClick={viewReport.bind(this, nodeData.name, 'FREE')} className={styles.actionFlow}>
                  查看主页
              </a>
              </div>
          }
        </div>
      );
    } else {
      const monitorInfo = monitorInfoList[monitorInfoList.findIndex((item) => item.companyName === nodeData.name)];
      if (monitorInfo.monitorMapResponse === undefined || (monitorInfo.reportId && monitorInfo.monitorMapResponse.companyType !== 'MAIN')) { // 报告类型
        output = (
          <div>
            <div className={styles.item}>
              已生成报告
            </div>
            <div className={styles.actionBox}>
              <a className={styles.actionFlow} onClick={viewReport.bind(this, monitorInfo.reportId, 'MAIN')}>查看主页</a>
            </div>
          </div>
        );
      } else { // 监控类型
        output = (
          <div>
            <div className={styles.item}>
              {monitorInfo.monitorStatus.indexOf('MONITOR') >= 0 ? <i className="fa fa-eye"> 正在监控中</i> : <i className="fa fa-eye-slash"> 已暂停监控</i>}
            </div>
            <div className={styles.actionBox}>
              <a className={styles.actionFlow} onClick={viewMonitor.bind(this, monitorInfo.monitorMapResponse.monitorId, monitorInfo.monitorMapResponse.companyType)}>查看主页</a>
            </div>
          </div>
        );
      }
    }
    return output;
  };
  return (
    <div>
      {getMonitorStatus()}
    </div>
  );
}

MonitorStatus.propTypes = {
  foo: PropTypes.string,
};
export default inject('routing')(observer(MonitorStatus));
