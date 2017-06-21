import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Purchasedservice({itemData}) {
  const {
    basicReportId,
    reportId,
    analysisReportId,
    monitorId
  } = itemData;
  if (basicReportId === -1 &&
      reportId === -1 &&
      analysisReportId === -1 &&
      monitorId === -1) {
    return null;
  }
  return (
    <div className={styles.serviceWrap}>
      { (basicReportId > -1 || reportId > -1) ? <span className={styles.serviceTag}>报告</span> : null }
      { analysisReportId > -1 ? <span className={styles.serviceTag}>分析</span> : null }
      { monitorId > -1 ? <span className={styles.serviceTag}>监控</span> : null }
    </div>
  );
}

Purchasedservice.propTypes = {
  itemData: PropTypes.object,
};
export default observer(Purchasedservice);
