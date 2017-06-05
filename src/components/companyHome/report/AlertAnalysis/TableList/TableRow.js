import React from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
function TableRow({data, routing, alertAnalysisStore, networkStore}) {
  const loadingId = alertAnalysisStore.loadingId;
  const viewDetail = () => {
    if (loadingId === data.id) {
      return false;
    }
    const alertType = data.alertType;
    if (alertType === 'BLACKLIST') {
      console.log(data.description.indexOf('"'), '行数据');
      // 因为后端没有返这个字段，所以要在描述里面去取
      const index = data.description.indexOf('"') + 1;
      console.log(data.description.slice(index, data.description.length - index), '风险关联公司名称');
      networkStore.jumpBlackNode(data.description.slice(index, data.description.length - index), routing.location.search);
      return false;
    }
    const {monitorId, analysisReportId} = routing.location.query;
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
      url = `/api/analysisReport/${analysisReportId}/alert/${ruleMap[alertType]}/${data.id}`;
      type = 'report';
    }
    alertAnalysisStore.changeValue('loadingId', data.id);
    // alertAnalysisStore.changeValue('detailData.info', data);
    const params = alertType === 'RULE' ? {index: 1, size: 8} : {};
    alertAnalysisStore.getAlertDetail(url, type, monitorId || analysisReportId, data, params);
  };
  const alertTypeMap = {
    'RULE': '我的预警',
    'BLACKLIST': '系统预警',
    'SYS_RULE': '系统预警',
  };
  return (
    <div className={styles.itemBox}>
      <div className={styles.lineRow}>
        <span className={styles.name}>
          {data.ruleName}
          <span className={styles.type}>
            {`${alertTypeMap[data.alertType]}${data.count}次`}
          </span>
        </span>
        <span
          className={styles.viewBtn}
          onClick={viewDetail}>
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
export default inject('routing', 'networkStore')(observer(TableRow));
