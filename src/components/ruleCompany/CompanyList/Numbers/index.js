import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Numbers({data}) {
  return (
    <div className={styles.box}>
      <div className={styles.content}>{data.count}</div>
      <div className={styles.title}>预警次数</div>
    </div>
  );
}

Numbers.propTypes = {
  data: PropTypes.object,
};
export default observer(Numbers);
