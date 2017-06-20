import React from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import styles from './index.less';
function CompanyWrap({data, monitorListStore}) {
  const monitorId = data.monitorId;
  const relStatus = monitorListStore.monitorList.relationListStatus.get(monitorId);
  const angle = relStatus === 'show' ? 'up' : 'down';
  const btnText = relStatus === 'show' ? '收起' : '展开';
  const viewReport = () => {
    browserHistory.push(`/companyHome/monitorTimeAxis?companyName=${data.companyName}`);
  };
  const viewRelation = () => {
    if (!relStatus || relStatus === 'hide') {
      monitorListStore.getRelationList(monitorId, data.relatedCount);
    } else {
      monitorListStore.delRelationList(monitorId);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.nameWrap}>
        <span
          className={styles.name}
          title={data.companyName}
          onClick={viewReport}
          >
          {data.companyName}
        </span>
      </div>
      <div className={styles.viewWrap}>
        {
          relStatus === 'loading'
          ?
          <div className={styles.actionBox}>
            <div className={styles.loadingBox}>
              <AnimateLoading animateCategory={1} />
            </div>
          </div>
          :
          <div className={styles.actionBox} onClick={viewRelation}>
            <i className={styles[angle]}></i>
            <span className={styles.btnText}>{btnText}</span>
          </div>
        }
        <div className={styles.relCount}>共<span>{data.relatedCount}</span>家关联公司</div>
      </div>
    </div>
  );
}

export default observer(CompanyWrap);
