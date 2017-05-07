import React from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
function TableRow({data, routing, alertAnalysisStore}) {
  const loadingId = alertAnalysisStore.loadingId;
  const viewDetail = () => {
    if (loadingId === data.id) {
      return false;
    }
    const alertType = data.alertType;
    if (alertType === 'BLACKLIST') {
      console.log(alertType, 'route to network');
      return false;
    }
    const {monitorId, reportId} = routing.location.query;
    const ruleMap = {
      RULE: 'rule',
      SYS_RULE: 'sysRule'
    };
    let url;
    let type;
    if (monitorId) {
      url = `/api/monitor/${monitorId}/alert/${ruleMap[alertType]}/${data.id}`;
      type = 'monitor';
    } else {
      url = `/api/analysisReport/${reportId}/alert/${ruleMap[alertType]}/${data.id}`;
      type = 'report';
    }
    alertAnalysisStore.changeValue('loadingId', data.id);
    // alertAnalysisStore.changeValue('detailData.info', data);
    alertAnalysisStore.getAlertDetail(url, type, monitorId || reportId, data);
  };
  return (
    <div className={styles.itemBox}>
      <div className={styles.lineRow}>
        <span className={styles.name}>
          {data.ruleName}
        </span>
        <span className={styles.type}>
          {data.alertType}
        </span>
        <span
          className={styles.viewBtn}
          onClick={viewDetail}
          >
          {loadingId === data.id ? '获取中' : '详情'}
        </span>
      </div>
      <div>
        <span className={styles.desc}>预警依据：{data.description}</span>
        <span className={styles.time}>预警日期：{data.ruleTime}</span>
      </div>
    </div>
  );
}
export default inject('routing')(observer(TableRow));
