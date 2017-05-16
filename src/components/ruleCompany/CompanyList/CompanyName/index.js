import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import styles from './index.less';

function CompanyName({data}) {
  // 公司名
  const name = data.companyName;
  // 分数
  const type = 80;
  // 跳转报告
  const link = () => {
    // 深度报告
    if (data.productType === 'ANALYSIS_REPORT') {
      browserHistory.push(`/companyHome/alertAnalysis?analysisReportId=${data.productId}&companyType=MAIN`);
    }
    // 高级报告
    if (data.productType === 'REPORT') {
      browserHistory.push(`/companyHome/alertAnalysis?reportId=${data.productId}&companyType=MAIN`);
    }
    // 监控
    if (data.productType === 'MONITOR') {
      browserHistory.push(`/companyHome/alertAnalysis?monitorId=${data.productId}&companyType=MAIN`);
    }
  };
  return (
    <div className={styles.box}>
      <div onClick={link} className={styles.name}>
        {name}
      </div>
      <div className={styles.type}>
        综合分{type}
      </div>
    </div>
  );
}

CompanyName.propTypes = {
  data: PropTypes.object,
};
export default observer(CompanyName);
