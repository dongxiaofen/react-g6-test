import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { runInAction } from 'mobx';
import pathval from 'pathval';

function BaseList({listData, routing, reportManageStore, payModalStore}) {
  const choiceOk = () => {
    const reportId = pathval.getPathValue(reportManageStore, 'agreeModal.reportId');
    const params = pathval.getPathValue(reportManageStore, 'params');
    reportManageStore.upGradeToMonitor(reportId, params, pathval.getPathValue(payModalStore, 'selectValue'));
  };

  const turnToMonitor = (reportId) => {
    payModalStore.openCompModal({
      'modalType': 'createMonitor',
      'width': '560',
      'pactName': '用户服务协议',
      'pactUrl': '/',
      'pointText': '创建报告即视为同意',
      'callBack': choiceOk
    });

    runInAction('显示弹窗', () => {
      pathval.setPathValue(reportManageStore, 'agreeModal.reportId', reportId);
      // pathval.setPathValue(payModalStore, 'value.monitorModalStatus', true);
      // pathval.setPathValue(payModalStore, 'value.modalType', 'turnMonitor');
    });
  };

  const viewReport = (reportId) => {
    const { push } = routing;
    push(`/companyHome?reportId=${reportId}&companyType=MAIN`);
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
    <div className={styles.item}>
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
export default inject('routing', 'reportManageStore', 'payModalStore')(observer(BaseList));
