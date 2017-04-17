import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function BaseList({listData}) {
  const turnToMonitor = (reportId) => {
    props.commonBoundAC.updateValue(['agreeModal', 'reportId'], reportId, 'REPORTMANAGE_UPDATE_VALUE');
    props.commonBoundAC.updateValue(['monitorModalStatus'], true, 'PAY_MODAL_UPDATE_VALUE');
    props.commonBoundAC.updateValue(['modalType'], 'turnMonitor', 'PAY_MODAL_UPDATE_VALUE');
  };

  const viewReport = (reportId) => {
    props.history.push(`/companyHome?reportId=${reportId}&companyType=MAIN`);
  };

  const stockTableType = (stockType) => {
    let str = '';
    if (stockType === 'A') {
      str = <span title="A股" className={styles.mainLabel}>A股</span>;
    } else if (stockType === 'NEEQ') {
      str = <span title="新三板" className={styles.mainLabel}>新三板</span>;
    }
    return str;
  };
  return (
    <div key={idx} className={styles.item}>
      <div className={styles.companyInfo}>
        <div className={styles.nameWrap}>
          <span onClick={viewReport.bind(this, listData.reportId)} className={styles.name}>{listData.companyName}</span>
          {listData.companyStatus ? <span title={listData.companyStatus} className={styles.mainLabel}>{listData.companyStatus}</span> : ''}
          {stockTableType(listData.stockType)}
        </div>
        <div className={styles.infoDetail}>
          <span className={styles.detailItem}>{`法人：${listData.frName ? listData.frName : '无'}`}</span>
          <span className={styles.detailItem}>{`地址：${listData.address ? listData.address : '无'}`}</span>
        </div>
      </div>
      <div className={styles.lastModifiedTs}>
        <div className={styles.timeValue}>{listData.lastModifiedTs.replace(/-/g, '/')}</div>
        <div className={styles.timeKey}>最近刷新日期</div>
      </div>
      <div className={styles.createdTs}>
        <div className={styles.timeValue}>{listData.createdTs.replace(/-/g, '/')}</div>
        <div className={styles.timeKey}>创建报告日期</div>
      </div>
      <div className={styles.anTime}>
        <div className={styles.timeValue}>{listData.analysisCount}</div>
        <div className={styles.timeKey}>刷新次数</div>
      </div>
      <div className={styles.actionWrap}>
        <div
          onClick={turnToMonitor.bind(this, listData.reportId)}
          className={`${styles.turnBtn}`}>
          加入监控
        </div>
        <div className={styles.deleteBtn}>删除报告</div>
      </div>
    </div>
  );
}

BaseList.propTypes = {
  item: PropTypes.object,
};
export default observer(BaseList);
