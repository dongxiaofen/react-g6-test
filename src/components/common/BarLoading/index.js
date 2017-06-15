import React from 'react';
import styles from './index.less';
function BarLoading() {
  return (
    <div className={styles.wrap}>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <p>数据加载中</p>
    </div>
  );
}

export default BarLoading;
