import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function FreeButton({}) {
  return (
    <div className={`${styles.wrap}`}>
      <div className={`${styles.addReport}`}>创建报告</div>
      <div className={`${styles.addMonitor}`}>加入监控</div>
    </div>
  );
}

FreeButton.propTypes = {
  itemData: PropTypes.object,
};
export default observer(FreeButton);
