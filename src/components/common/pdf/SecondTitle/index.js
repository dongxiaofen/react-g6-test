import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function SecondTitle({module = '二级标题' }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.icon}></span>
      <span className={styles.title}>
          {module}
        </span>
    </div>
  );
}

SecondTitle.propTypes = {
  className: PropTypes.string,
  module: PropTypes.string,
};
export default observer(SecondTitle);
