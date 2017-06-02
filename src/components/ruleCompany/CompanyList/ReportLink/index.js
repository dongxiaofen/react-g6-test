import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function ReportLink({data}) {
  // 类型
  let type = '';
  if (data.productType === 'MONITOR') {
    type = '监控';
  } else {
    type = '报告';
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
