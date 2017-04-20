import React from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import styles from './index.less';
function CompanyWrap({data, monitorListStore}) {
  const monitorId = data.monitorId;
  const relStatus = monitorListStore.relationListStatus.get(monitorId);
  const angle = relStatus === 'show' ? 'up' : 'down';
  const btnText = relStatus === 'show' ? '收起' : '展开';
  const viewReport = () => {
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
  const viewRelation = () => {
    if (!relStatus || relStatus === 'hide') {
      monitorListStore.getRelationList(111);
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
        {data.companyStatus && <span className={styles.mainLabelBlue}>{data.companyStatus}</span>}
        {stockTableType(data.stockType)}
        {data.remainderDays <= 7 && data.remainderDays > 0 && <span className={styles.mainLabelRed}>{`${data.remainderDays}天内即将到期`}</span>}
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
