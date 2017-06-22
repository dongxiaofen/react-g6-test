import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import networkType from 'dict/networkType';
import LinkJump from 'components/common/LinkJump';

function MonitorStatus({ nodeData, monitorInfoList, modalStore, networkStore, companyHomeStore }) {
  // const monitorStatus = (monitorInfo) => {
  //   const status = monitorInfo.monitorStatus;
  //   if (status.indexOf('MONITOR') >= 0) {
  //     return (<span>{monitorInfo.monitorMapResponse.companyType === 'ASSOCIATE' ? '关联监控中' : '正在监控中'}</span>);
  //   }
  //   if (status.indexOf('EXPIRED') >= 0) {
  //     return (<span> 监控已到期</span>);
  //   }
  //   return (<span> 监控已暂停</span>);
  // };
  const monitorId = companyHomeStore.reportInfo.monitorId;
  const handleCreateMonitor = () => {
    const params = {
      name: nodeData.name,
      type: networkType[networkType.findIndex((item) => item.id === nodeData.category)].subType,
      position: 'NETWORK'
    };
    networkStore.monitorExistNode(monitorId, params);
  };
  const openCreateMonitorModal = () => {
    const args = {
      title: '添加关联监控',
      width: '420px',
      pointText: true,
      confirmAction: handleCreateMonitor,
      cancelAction: modalStore.closeAction,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./CreateMonitor'));
        });
      }
    };
    modalStore.openCompModal({ ...args });
  };
  const getMonitorStatus = () => {
    let output = '';
    const monitorInfo = monitorInfoList[monitorInfoList.findIndex((item) => item.companyName === nodeData.name)];
    // console.log(monitorInfo);
    if (monitorInfo) {
      output = 'foo';
    }
    return output;
  };
  const getActionGroup = () => {
    let output;
    if (nodeData.cateType === 2) {
      output = '';
    } else if (monitorInfoList.findIndex((item) => item.companyName === nodeData.name) < 0) { // 不在监控列表中
      output = (
        <div className={styles.actionBox}>
          <LinkJump referer="self" name={nodeData.name} label="查看企业" className={styles.actionFlow} />
          {
            monitorId ?
              <a onClick={openCreateMonitorModal} className={styles.actionFlow}>
                关联监控
              </a> : ''
          }
        </div>
      );
    } else {
      output = (
        <div className={styles.actionBox}>
          <LinkJump referer="self" name={nodeData.name} label="查看企业" className={styles.actionFlow} />
        </div>
      );
    }
    return output;
  };
  return (
    <div>
      {getMonitorStatus()}
      {getActionGroup()}
    </div>
  );
}

MonitorStatus.propTypes = {
  foo: PropTypes.string,
};
export default inject('modalStore', 'networkStore', 'companyHomeStore')(observer(MonitorStatus));
