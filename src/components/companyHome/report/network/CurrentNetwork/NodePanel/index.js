import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import colseImg from 'imgs/close.png';
import NodeType from './NodeType';
import InvestInfo from './InvestInfo';
import ReportStatus from './ReportStatus';
import LinkJump from 'components/common/LinkJump';
import Button from 'components/lib/button';
// import networkType from 'dict/networkType';

function NodePanel({ networkStore }) {
  const { show, nodeData } = networkStore.nodePanel;
  if (!show || !nodeData) {
    return null;
  }
  // const monitorId = companyHomeStore.reportInfo.monitorId;
  const monitorInfo = networkStore.monitorInfoList[networkStore.monitorInfoList.findIndex((item) => item.companyName === nodeData.name)];
  const hidePanel = () => {
    networkStore.closePanel();
  };
  // const handleCreateMonitor = () => {
  //   const params = {
  //     name: nodeData.name,
  //     type: networkType[networkType.findIndex((item) => item.id === nodeData.category)].subType,
  //     position: 'NETWORK'
  //   };
  //   networkStore.monitorExistNode(monitorId, params);
  // };
  // const openCreateMonitorModal = () => {
  //   const args = {
  //     title: '添加关联监控',
  //     width: '420px',
  //     pointText: true,
  //     confirmAction: handleCreateMonitor,
  //     cancelAction: modalStore.closeAction,
  //     loader: (cb) => {
  //       require.ensure([], (require) => {
  //         cb(require('./CreateMonitor'));
  //       });
  //     }
  //   };
  //   modalStore.openCompModal({ ...args });
  // };

  // const goToBlackList = (nodeName) => {
  //   if (networkStore.showFullScreen) {
  //     exitFull();
  //     networkStore.toggleFullScreen();
  //   }
  //   networkStore.jumpBlackNode(nodeName, routing.location.search);
  // };
  const getShortestPath = ()=> {
    networkStore.getShortestPath({nodeName: nodeData.name});
  };
  return (
    <div className={styles.box}>
      <div
        className={`clearfix ${styles.close}`}
        onClick={hidePanel}>
        <img className={styles.colseImg} src={colseImg} alt="" />
      </div>
      <div>
        {
          nodeData.status === 0 ? <span className={styles.cancelStatus}>已注销</span> : ''
        }
        <span className={styles.nodeName}>{nodeData.name}</span>
      </div>
      <NodeType nodeData={nodeData} {...networkStore} />
      <InvestInfo nodeData={nodeData} {...networkStore} />
      <hr className={styles.hr} />
      <ReportStatus monitorInfo={monitorInfo} />
      {
        nodeData.cateType !== 2 ?
          <LinkJump referer="self" name={nodeData.name} label="查看企业" className={styles.link} /> : ''
      }
      <Button btnType="primary" className={styles.button} onClick={getShortestPath} loading={networkStore.shortPathLoading}>关联路径</Button>
      {/*{
        nodeData.cateType !== 2 && monitorId && !monitorInfo ?
          <a onClick={openCreateMonitorModal} className={styles.link}>
            关联监控
              </a> : ''
      }*/}
      {/*{
        nodeData.blackList && nodeData.category !== 7 ?
          <a className={styles.link} onClick={goToBlackList.bind(this, nodeData.name)}>{`高风险记录（${nodeData.caseRecord.length}）`}</a> : ''
      }*/}
    </div>
  );
}

NodePanel.propTypes = {
  foo: PropTypes.string,
};
export default inject('networkStore', 'routing')(observer(NodePanel));
