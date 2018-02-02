import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';

function ContBox({title, children}) {
  return (
    <div className={styles['content-box']}>
      <p className={styles.title}>{title}</p>
      <div className={styles['main-cont']}>{children}</div>
    </div>
  );
}

ContBox.propTypes = {
  children: PropTypes.object,
  title: PropTypes.string,
};
export default observer(ContBox);
