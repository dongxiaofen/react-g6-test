import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function ModuleTitle({module}) {
  return (
    <div className={styles.wrap}>
      <span className={styles.title}>{module}</span>
    </div>
  );
}

ModuleTitle.propTypes = {
  module: PropTypes.string,
};
export default observer(ModuleTitle);
