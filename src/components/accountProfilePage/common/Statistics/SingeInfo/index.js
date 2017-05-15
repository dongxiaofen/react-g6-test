import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';


function SingeInfo({title, count}) {
  return (
    <div className={styles.singeBox}>
      <h2 className={styles.title}>{title}
      <div className={styles.line_border}></div>
      </h2>
      <div className={styles.count}>
        {count}
        <span className={styles.unit}>家</span>
      </div>
    </div>
  );
}

SingeInfo.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
};
export default observer(SingeInfo);
