import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Numbers({}) {
  return (
    <div className={styles.box}>
      Numbers
    </div>
  );
}

Numbers.propTypes = {
  foo: PropTypes.string,
};
export default observer(Numbers);
