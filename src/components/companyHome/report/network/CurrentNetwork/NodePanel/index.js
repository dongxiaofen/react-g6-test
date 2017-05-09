import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import colseImg from 'imgs/close.png';
import NodeType from './NodeType';
import MonitorStatus from './MonitorStatus';

function NodePanel({ networkStore, routing }) {
  const { show, nodeData } = networkStore.nodePanel;
  const hidePanel = () => {
    networkStore.closePanel();
  };
  const getCancelStatus = () => {
    if (nodeData.status === 0) {
      return (
        <div>
          已注销
        </div>
      );
    }
    return null;
  };
  const goToBlackList = (nodeName) => {
    networkStore.jumpBlackNode(nodeName, routing.location.search);
    // routing.push(`/companyHome/blackNetwork${routing.location.search}`);
  };
  const getRiskInfo = () => {
    if (nodeData.blackList && nodeData.category !== 7) {
      return (
        <div>
          <a className={styles.blackLink} onClick={goToBlackList.bind(this, nodeData.name)}>{`高风险记录（${nodeData.caseRecord.length}）`}</a>
        </div>
      );
    }
    return '';
  };
  if (!show) {
    return null;
  }
  return (
    <div className={styles.box}>
      <div
        className={`clearfix ${styles.close}`}
        onClick={hidePanel}>
        <img className={styles.colseImg} src={colseImg} alt="" />
      </div>
      <div className={styles.nodeName}>
        {nodeData.name}
      </div>
      {getCancelStatus()}
      <NodeType nodeData={nodeData} {...networkStore} />
      {getRiskInfo()}
      <MonitorStatus nodeData={nodeData} monitorInfoList={networkStore.monitorInfoList} />
    </div>
  );
}

NodePanel.propTypes = {
  foo: PropTypes.string,
};
export default inject('networkStore', 'routing')(observer(NodePanel));
