import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function ReportStatus({ monitorInfo }) {
  const getService = () => {
    const { basicReportId, reportId, analysisReportId, monitorType } = monitorInfo;
    const reportService = (basicReportId || reportId) ? '报告' : '';
    const analysisService = analysisReportId ? '分析' : '';
    const monitorService = { 'MAIN': '监控', 'ASSOCIATE': '关联监控' }[monitorType] ? { 'MAIN': '监控', 'ASSOCIATE': '关联监控' }[monitorType] : '';
    console.log(reportService, analysisService, monitorService);
    return (
      <div className={styles.serviceWrap}>
        {reportService ? <span className={styles.serviceTag}>{reportService}</span> : null}
        {analysisService ? <span className={styles.serviceTag}>{analysisService}</span> : null}
        {monitorService ? <span className={styles.serviceTag}>{monitorService}</span> : null}
      </div>
    );
  };
  if (monitorInfo) {
    return (
      <div className="clearfix">
        <span className={styles.text}>已有</span>
        {getService()}
      </div>
    );
  }
  return null;
}

ReportStatus.propTypes = {
  foo: PropTypes.string,
};
export default observer(ReportStatus);
