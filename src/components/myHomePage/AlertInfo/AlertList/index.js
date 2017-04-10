import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import BasicList from '../BasicList';
import styles from './index.less';

function AlertList() {
  return (
    <div className={styles.listContainer}>
      <ul className={styles.AlertWrap}>
        <BasicList />
      </ul>
    </div>
  );
}

AlertList.propTypes = {
  foo: PropTypes.string,
};
export default observer(AlertList);
