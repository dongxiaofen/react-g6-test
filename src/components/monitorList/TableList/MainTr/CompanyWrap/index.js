import React from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import styles from './index.less';
function CompanyWrap({data, monitorListStore}) {
  const viewReport = (monitorId) => {
    browserHistory.push(`/companyHome?monitorId=${monitorId}&companyType=MAIN`);
  };
  const stockTableType = (stockType) => {
    let str = '';
    if (stockType === 'A') {
      str = <span title="A股" className={styles.mainLabelBlue}>A股</span>;
    } else if (stockType === 'NEEQ') {
      str = <span title="新三板" className={styles.mainLabelBlue}>新三板</span>;
    }
    return str;
  };
  const viewRelation = (monitorId, angle) => {
    if (angle === 'down') {
      monitorListStore.getRelationList(monitorId);
      console.log(monitorId);
    } else {
      monitorListStore.delRelationList(monitorId);
      console.log(monitorId);
    }
  };
  const showRel = monitorListStore.relationShow['key_' + data.monitorId];
  const angle = showRel ? 'up' : 'down';
  const btnText = showRel ? '收起' : '展开';
  return (
    <div className={styles.wrapper}>
      <div className={styles.nameWrap}>
        <span
          className={styles.name}
          title={data.companyName}
          onClick={viewReport.bind(this, data.monitorId)}
          >
          {data.companyName}
        </span>
        {data.companyStatus && <span className={styles.mainLabelBlue}>{data.companyStatus}</span>}
        {stockTableType(data.stockType)}
        {data.remainderDays <= 7 && data.remainderDays > 0 && <span className={styles.mainLabelRed}>{`${data.remainderDays}天内即将到期`}</span>}
      </div>
      <div className={styles.viewWrap}>
        {
          monitorListStore.relationLoading[data.monitorId]
          ?
          <div className={styles.actionBox}>
            <div className={styles.loadingBox}>
              loading
            </div>
          </div>
          :
          <div className={styles.actionBox} onClick={viewRelation.bind(this, data.monitorId, angle)}>
            <i className={styles[angle]}></i>
            <span className={styles.btnText}>{btnText}</span>
          </div>
        }
        <div className={styles.relCount}>共<span>{data.relatedCount}</span>家关联公司，正在监控</div>
      </div>
    </div>
  );
}

export default observer(CompanyWrap);
