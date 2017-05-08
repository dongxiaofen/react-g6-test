import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import styles from './index.less';

function CompanyName({data, leftBarStore}) {
  // 公司名
  const name = data.companyName;
  // 类型
  let type = '';
  switch (data.productType) {
    case 'ANALYSIS_REPORT':
      type = '深度评估报告';
      break;
    case 'REPORT':
      type = '高级评估报告';
      break;
    case 'MONITOR':
      type = '主体监控报告';
      break;
    default:
      break;
  }
  // 跳转报告
  const link = () => {
    const rute = {activeItem: 'alertAnalysis'};
    leftBarStore.combineServerData.bind(this, rute);
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
        {type}
      </div>
    </div>
  );
}

CompanyName.propTypes = {
  data: PropTypes.object,
  leftBarStore: PropTypes.object,
};
export default observer(CompanyName);
