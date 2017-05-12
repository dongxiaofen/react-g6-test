import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import styles from './index.less';

function ReportButton({itemData}) {
  let text = '';
  if (itemData && itemData.monitorId > 0) {
    text = '查看监控';
  } else if (itemData && itemData.analysisReportId > 0) {
    text = '查看深度报告';
  } else {
    text = '查看高级报告';
  }
  const hrefCompany = () => {
    if (itemData && itemData.monitorId > 0) {
      browserHistory.push('/companyHome?monitorId=' + itemData.monitorId + '&companyType=MAIN');
    } else if (itemData && itemData.analysisReportId > 0) {
      browserHistory.push('/companyHome?analysisReportId=' + itemData.analysisReportId + '&companyType=MAIN');
    } else {
      browserHistory.push('/companyHome?reportId=' + itemData.reportId + '&companyType=MAIN');
    }
  };
  return (
    <div onClick={hrefCompany} className={`${styles.wrap}`}>
      <div className={`${styles.addMonitor}`}>
        {text}
      </div>
    </div>
  );
}

ReportButton.propTypes = {
  itemData: PropTypes.object,
};
export default observer(ReportButton);
