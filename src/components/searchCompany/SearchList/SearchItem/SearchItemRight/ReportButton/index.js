import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function ReportButton({}) {
  return (
    <div className={`${styles.wrap}`}>
      <div className={`${styles.addMonitor}`}>加入监控</div>
    </div>
  );
}

ReportButton.propTypes = {
  foo: PropTypes.string,
};
export default observer(ReportButton);
