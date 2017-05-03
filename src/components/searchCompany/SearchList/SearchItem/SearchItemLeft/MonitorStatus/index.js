import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function MonitorStatus({itemData}) {
  // 监控状态 正在监控 暂停监控 已到期等
  let monitorStatus = '';
  switch (itemData.monitorStatus) {
    case 'MONITOR':
      monitorStatus = (
        <div className={`${styles.monitorStatus}`}>
          <i></i>
          <span>已加入监控</span>
        </div>
      );
      break;
    case 'PAUSE':
      monitorStatus = (
        <div className={`${styles.pauseStatus}`}>
          <i></i>
          <span>监控已暂停</span>
        </div>
      );
      break;
    case 'EXPIRED':
      monitorStatus = (
        <div className={styles.expiredStatus}>
          <i></i>
          <span>监控已到期</span>
        </div>
      );
      break;
    case 'NOT_MONITOR':
      if (itemData && itemData.analysisReportStatus === 'REPORT') {
        monitorStatus = (
          <div className={styles.reportStatus}>
            <span>深度分析报告</span>
          </div>
        );
      }
      if (itemData && itemData.reportStatus === 'REPORT') {
        monitorStatus = (
          <div className={styles.reportStatus}>
            <span>高级查询报告</span>
          </div>
        );
      }
      break;
    default:
      break;
  }
  return (
    <div className={`${styles.monitorStyle}`}>
      {monitorStatus}
    </div>
  );
}

MonitorStatus.propTypes = {
  itemData: PropTypes.object,
};
export default observer(MonitorStatus);
