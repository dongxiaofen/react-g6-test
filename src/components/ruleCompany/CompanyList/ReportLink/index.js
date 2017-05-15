import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function ReportLink({data}) {
  // 类型
  let type = '';
  switch (data.productType) {
    case 'ANALYSIS_REPORT':
      type = '深度分析';
      break;
    case 'REPORT':
      type = '高级报告';
      break;
    case 'MONITOR':
      type = '主体监控';
      break;
    default:
      break;
  }
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        {type}
      </div>
      <div className={styles.title}>报告类型</div>
    </div>
  );
}

ReportLink.propTypes = {
  data: PropTypes.object,
};
export default observer(ReportLink);
