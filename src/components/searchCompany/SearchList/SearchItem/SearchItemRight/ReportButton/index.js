import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import styles from './index.less';

function ReportButton({itemData}) {
  const hrefCompany = () => {
    if (itemData && itemData.reportId > 0) {
      browserHistory.push('/companyHome?reportId=' + itemData.reportId + '&companyType=MAIN');
    } else if (itemData && itemData.analysisReportId > 0) {
      browserHistory.push('/companyHome?analysisReportId=' + itemData.analysisReportId + '&companyType=MAIN');
    } else {
      browserHistory.push('/companyHome?monitorId=' + itemData.monitorId + '&companyType=MAIN');
    }
  };
  return (
    <div onClick={hrefCompany} className={`${styles.wrap}`}>
      <div className={`${styles.addMonitor}`}>查看</div>
    </div>
  );
}

ReportButton.propTypes = {
  itemData: PropTypes.object,
};
export default observer(ReportButton);
