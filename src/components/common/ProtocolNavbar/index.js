import React from 'react';
import styles from './index.less';

function ProtocolNavbar() {
  return (
    <div className={`clearfix ${styles['header-navbar']}`}>
      <div className={`pull-left ${styles.logo}`}></div>
    </div>
  );
}

export default ProtocolNavbar;
