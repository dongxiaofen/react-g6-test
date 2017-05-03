import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import pathval from 'pathval';

import styles from './index.less';
import { Row, Col } from 'components/common/layout';

function BaseList({ item, status, routing, reportManageStore, payModalStore }) {
  const reportId = status === 'report' ? item.reportId : item.analysisReportId;
  const choiceOk = () => {
    const params = pathval.getPathValue(reportManageStore, 'params');
    reportManageStore.upGradeToMonitor(reportId, params, pathval.getPathValue(payModalStore, 'selectValue'));
  };

  const turnToMonitor = () => {
    payModalStore.openCompModal({
      'modalType': 'createMonitor',
      'width': '560px',
      'pactName': '用户服务协议',
      'pactUrl': '/',
      'pointText': '创建报告即视为同意',
      'callBack': choiceOk
    });

    runInAction('显示弹窗', () => {
      pathval.setPathValue(reportManageStore, 'agreeModal.reportId', reportId);
    });
  };

  const viewReport = () => {
    const { push } = routing;
    if (status === 'report') {
      push(`/companyHome?reportId=${reportId}&companyType=MAIN`);
    } else {
      push(`/companyHome?analysisReportId=${reportId}&companyType=MAIN`);
    }
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
              {
                status === 'report'
                ?
                <div className={`${styles.turnBtn}`}>
                  升级报告
                </div>
                : null
              }
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
  reportManageStore: PropTypes.object,
  payModalStore: PropTypes.object,
  item: PropTypes.object,
  status: PropTypes.string,
};
export default inject('routing', 'reportManageStore', 'payModalStore')(observer(BaseList));
