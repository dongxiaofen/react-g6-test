import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Time({data}) {
  return (
    <div className={styles.box}>
      <div className={styles.content}>{data.latestDt}</div>
      <div className={styles.title}>最近预警日期</div>
    </div>
  );
}

Time.propTypes = {
  data: PropTypes.object,
};
export default observer(Time);
