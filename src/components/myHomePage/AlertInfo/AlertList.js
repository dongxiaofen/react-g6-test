import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import BasicList from './BasicList';
import styles from './index.less';

function AlertInfo() {
  return (
  <div className={styles.listContainer}>
    <ul className={styles.AlertWrap}>
      <BasicList />
    </ul>
  </div>
  );
}

AlertInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(AlertInfo);
