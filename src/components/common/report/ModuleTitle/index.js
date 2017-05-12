import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function ModuleTitle({ module, count }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.title}>{module}</span>
      {
        count ?
        <span className={styles.number}>
          （{count}）
        </span> : ''
      }
    </div>
  );
}

ModuleTitle.propTypes = {
  module: PropTypes.string,
  count: PropTypes.number
};
export default observer(ModuleTitle);
