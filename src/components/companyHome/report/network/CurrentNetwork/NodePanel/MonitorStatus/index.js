import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import networkType from 'dict/networkType';

function MonitorStatus({ nodeData, monitorInfoList, routing, modalStore, networkStore }) {
  const monitorId = routing.location.query.monitorId;
  const viewMonitor = (id, type = 'MAIN') => {
    location.href = `/companyHome?monitorId=${id}&companyType=${type}`;
  };
  const viewReport = (reportId, type) => {
    location.href = type === 'MAIN' ? `/companyHome?reportId=${reportId}&companyType=${type}` : `/companyHome?companyName=${reportId}&companyType=${type}`;
  };
  const gotoSearch = (name) => {
    networkStore.gotoSearch(name);
  };
  const monitorStatus = (monitorInfo) => {
    const status = monitorInfo.monitorStatus;
    if (status.indexOf('MONITOR') >= 0) {
      return (<span>{monitorInfo.monitorMapResponse.companyType === 'ASSOCIATE' ? '关联监控中' : '正在监控中'}</span>);
    }
    if (status.indexOf('EXPIRED') >= 0) {
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
                <a onClick={gotoSearch.bind(this, nodeData.name)} className={styles.actionFlow}>
                  查看企业
              </a>
                <a onClick={openCreateMonitorModal} className={styles.actionFlow}>
                  关联监控
              </a>
              </div> :
              <div className={styles.actionBox}>
                <a onClick={gotoSearch.bind(this, nodeData.name)} className={styles.actionFlow}>
                  查看企业
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
              {monitorStatus(monitorInfo)}
            </div>
            <div className={styles.actionBox}>
              <a className={styles.actionFlow} onClick={viewMonitor.bind(this, monitorInfo.monitorMapResponse.monitorId, monitorInfo.monitorMapResponse.companyType)}>查看企业</a>
            </div>
          </div>
        );
      } else if (monitorInfo.reportStatus === 'REPORT') {
        // 查询报告
        output = (
          <div>
            <div className={styles.item}>
              已创建高级查询报告
            </div>
            <div className={styles.actionBox}>
              <a className={styles.actionFlow} onClick={viewReport.bind(this, monitorInfo.reportId, 'MAIN')}>查看企业</a>
            </div>
          </div>
        );
      } else if (monitorInfo.monitorMapResponse && monitorInfo.monitorMapResponse.companyType === 'ASSOCIATE' && monitorInfo.monitorMapResponse.monitorId) {
        // 关联监控
        output = (
          <div>
            <div className={styles.item}>
              {monitorStatus(monitorInfo)}
            </div>
            <div className={styles.actionBox}>
              <a className={styles.actionFlow} onClick={gotoSearch.bind(this, nodeData.name)}>查看企业</a>
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
