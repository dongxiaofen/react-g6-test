import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Area({}) {
  return (
    <div className={styles.box}>
      Area
    </div>
  );
}

Area.propTypes = {
  foo: PropTypes.string,
};
export default observer(Area);
