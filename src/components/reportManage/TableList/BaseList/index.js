import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';

import styles from './index.less';
import { Row, Col } from 'components/common/layout';

function BaseList({
  uiStore,
  routing,
  reportManageStore,
  payModalStore,
  // modalStore,
  item,
}) {
  const reportId = item.reportId;
  const choiceOk = () => {
    const reportManagePager = uiStore.uiState.reportManagePager;
    const params = {
      companyName: '',
      index: reportManagePager.index,
      size: reportManagePager.size
    };
    reportManageStore.upGradeToMonitor(reportId, params, payModalStore.selectValue);
  };

  const turnToMonitor = () => {
    payModalStore.openCompModal({
      'modalType': 'createMonitor',
      'pointText': true,
      'callBack': choiceOk
    });
  };

  const viewReport = () => {
    const { push } = routing;
    push(`/companyHome?reportId=${reportId}`);
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
    <div className={`clearfix ${styles.item}`}>
      <Row>
        <Col width="5">
          <div className={styles.nameWrap}>
            <span onClick={viewReport} className={styles.name}>{item.companyName}</span>
            {
              item.companyStatus
                ? <span title={item.companyStatus} className={styles.mainLabel}>{item.companyStatus}</span>
                : null
            }
            {stockTableType(item.stockType)}
          </div>
          <div className={styles.infoDetail}>
            <span className={styles.detailItem}>{`法人：${item.frName ? item.frName : '无'}`}</span>
            <span className={styles.detailItem}>{`地址：${item.address ? item.address : '无'}`}</span>
          </div>
        </Col>
        <Col width="4">
          <div className="clearfix">
            <div className={styles.lastModifiedTs}>
              <div className={styles.timeValue}>{item.lastModifiedTs}</div>
              <div className={styles.timeKey}>最近刷新日期</div>
            </div>
            <div className={styles.createdTs}>
              <div className={styles.timeValue}>{item.createdTs}</div>
              <div className={styles.timeKey}>创建报告日期</div>
            </div>
            <div className={styles.anTime}>
              <div className={styles.timeValue}>{item.analysisCount}</div>
              <div className={styles.timeKey}>刷新次数</div>
            </div>
          </div>
        </Col>
        <Col width="3">
          <div className="clearfix">
            <div className={`clearfix ${styles.actionWrap}`}>
              <div className={`${styles.turnBtn}`}
                onClick={turnToMonitor}>
                加入监控
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

BaseList.propTypes = {
  routing: PropTypes.object,
  uiStore: PropTypes.object,
  reportManageStore: PropTypes.object,
  payModalStore: PropTypes.object,
  // modalStore: PropTypes.object,
  item: PropTypes.object,
};
export default inject(
  'routing',
  'uiStore',
  'reportManageStore',
  // 'modalStore',
  'payModalStore'
)(observer(BaseList));
