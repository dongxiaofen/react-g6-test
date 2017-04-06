import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function BaseInfo({}) {
  return (
    <div className={styles.baseInfo}>
      <div className={styles.ItemLef}>
        4
      </div>
      <div className={styles.baseInfoItem}>
        1
      </div>
      <div className={styles.baseInfoItem}>
        1
      </div>
    </div>
  );
}

BaseInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(BaseInfo);
