import React from 'react';
import styles from './index.less';
function Title({children}) {
  return (
    <div className={styles.titleCss}>
      {children}
    </div>
  );
}

export default Title;
