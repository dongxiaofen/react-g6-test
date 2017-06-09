import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import Button from 'components/lib/button';

function ReportOper({companyHomeStore, routing}) {
  const companyName = routing.location.query.companyName;
  return (
    <div>
      {
        companyHomeStore.reportInfo.reportId === '' ?
        <Button btnType="primary"
          className={styles.btn}
          onClick={companyHomeStore.openUpReportModal}>升级报告</Button>
        : ''
      }
      {
        companyHomeStore.reportInfo.dimensions.length < 4 ?
        <Button
          btnType="primary"
          className={styles.btnLoan}
          onClick={companyHomeStore.openLoanModal}>创建分析</Button>
        : ''
      }
      {
        companyHomeStore.reportInfo.monitorId === '' ?
        <Button
          btnType="primary"
          className={styles.btnLoan}
          onClick={companyHomeStore.createMonitor.bind(null, companyName)}>
          加入监控
        </Button>
        : ''
      }
    </div>
  );
}

ReportOper.propTypes = {
  foo: PropTypes.string,
};
export default inject('companyHomeStore', 'routing')(observer(ReportOper));
