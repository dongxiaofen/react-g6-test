import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import networkType from 'dict/networkType';

function MonitorStatus({ nodeData, monitorInfoList, routing, modalStore, networkStore }) {
  const monitorId = routing.location.query.monitorId;
  const viewMonitor = (id, type = 'MAIN') => {
    location.href = `/companyHome?monitorId=${id}&companyType=${type}`;
  };
  const viewAnaReport = (analysisReportId, type) => {
    location.href = `/companyHome?analysisReportId=${analysisReportId}&companyType=${type}`;
  };
  const viewReport = (reportId, type) => {
    location.href = type === 'MAIN' ? `/companyHome?reportId=${reportId}&companyType=${type}` : `/companyHome?companyName=${reportId}&companyType=${type}`;
  };
  const monitorStatus = (value) => {
    if (value.indexOf('MONITOR') >= 0) {
      return (<span> 正在监控中</span>);
    }
    if (value.indexOf('EXPIRED') >= 0) {
      return (<span> 监控已到期</span>);
    }
    return (<span> 监控已暂停</span>);
  };
  const handleCreateMonitor = () => {
    const params = {
      name: nodeData.name,
      type: networkType[networkType.findIndex((item) => item.id === nodeData.category)].subType,
      position: 'NETWORK'
    };
    networkStore.monitorExistNode(monitorId, params);
  };
  const openCreateMonitorModal = () => {
    modalStore.openCompModal({
      title: '添加关联监控',
      width: 440,
      confirmAction: handleCreateMonitor,
      cancelAction: modalStore.closeAction,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./CreateMonitor'));
        });
      }
    });
  };
  const getMonitorStatus = () => {
    let output;
    if (nodeData.cateType === 2) {
      output = '';
    } else if (monitorInfoList.findIndex((item) => item.companyName === nodeData.name) < 0) { // 不在监控列表中
      output = (
        <div>
          {
            monitorId ?
              <div className={styles.actionBox}>
                <a onClick={viewReport.bind(this, nodeData.name, 'FREE')} className={styles.actionFlow}>
                  查看主页
              </a>
                <a onClick={openCreateMonitorModal} className={styles.actionFlow}>
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
      if (monitorInfo.monitorMapResponse && monitorInfo.monitorMapResponse.companyType === 'MAIN' && monitorInfo.monitorMapResponse.monitorId) {
        // 主体监控
        output = (
          <div>
            <div className={styles.item}>
              {monitorStatus(monitorInfo.monitorStatus)}
            </div>
            <div className={styles.actionBox}>
              <a className={styles.actionFlow} onClick={viewMonitor.bind(this, monitorInfo.monitorMapResponse.monitorId, monitorInfo.monitorMapResponse.companyType)}>查看主页</a>
            </div>
          </div>
        );
      } else if (monitorInfo.analysisReportStatus) {
        // 深度分析报告
        output = (
          <div>
            <div className={styles.item}>
              已创建深度分析报告
            </div>
            <div className={styles.actionBox}>
              <a className={styles.actionFlow} onClick={viewAnaReport.bind(this, monitorInfo.analysisReportId, 'MAIN')}>查看主页</a>
            </div>
          </div>
        );
      } else if (monitorInfo.reportStatus === 'REPORT') {
        // 高级报告
        output = (
          <div>
            <div className={styles.item}>
              已创建高级查询报告
            </div>
            <div className={styles.actionBox}>
              <a className={styles.actionFlow} onClick={viewReport.bind(this, monitorInfo.reportId, 'MAIN')}>查看主页</a>
            </div>
          </div>
        );
      } else if (monitorInfo.monitorMapResponse && monitorInfo.monitorMapResponse.companyType === 'ASSOCIATE' && monitorInfo.monitorMapResponse.monitorId) {
        // 关联监控
        output = (
          <div>
            <div className={styles.item}>
              {monitorStatus(monitorInfo.monitorStatus)}
            </div>
            <div className={styles.actionBox}>
              <a className={styles.actionFlow} onClick={viewMonitor.bind(this, monitorInfo.monitorMapResponse.monitorId, 'ASSOCIATE')}>查看主页</a>
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
export default inject('routing', 'modalStore', 'networkStore')(observer(MonitorStatus));
