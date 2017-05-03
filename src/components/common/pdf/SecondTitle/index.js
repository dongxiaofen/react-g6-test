import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function SecondTitle({id, module = '二级标题' }) {
  return (
    <div id={id} className={styles.wrap}>
      <span className={styles.icon}></span>
      <span className={styles.title}>
          {module}
        </span>
    </div>
  );
}

SecondTitle.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  module: PropTypes.string,
};
export default observer(SecondTitle);
