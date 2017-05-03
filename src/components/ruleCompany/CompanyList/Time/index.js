import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Time({}) {
  return (
    <div className={styles.box}>
      time
    </div>
  );
}

Time.propTypes = {
  foo: PropTypes.string,
};
export default observer(Time);
