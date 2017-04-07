import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import AlertTittle from './AlertTittle';
import AlertList from './AlertList';
import styles from './index.less';

function AlertInfo({}) {
  return (
    <div className={styles.Alert}>
      <AlertTittle />
      <AlertList />
    </div>
  );
}

AlertInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(AlertInfo);
