import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function AlertTittle() {
  return (
    <div className={styles.TittleText}>
      <h3>预警通知</h3>
      <p className={styles.messageCount}>共<span>0</span>条预警信息</p>
    </div>
  );
}

AlertTittle.propTypes = {
  styles: PropTypes.object,
};
export default observer(AlertTittle);
