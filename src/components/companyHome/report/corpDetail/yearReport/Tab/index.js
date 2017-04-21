import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Tab({}) {
  return (
    <div className={styles.box}>

    </div>
  );
}

Tab.propTypes = {
  foo: PropTypes.string,
};
export default observer(Tab);
