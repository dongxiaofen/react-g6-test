import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';


function SingeInfo({}) {
  return (
    <div>
      <div className={styles.title}>预警企业</div>
      <div className={styles.count}>4545
        <span className={styles.unit}>家</span>
      </div>
    </div>
  );
}

SingeInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(SingeInfo);
