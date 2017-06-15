import React from 'react';
import styles from './index.less';
function BarLoading({message, size}) {
  console.log(size, message);
  return (
    <div style={{transform: `scale(${size})`}} className={styles.wrap}>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <p>{message}</p>
    </div>
  );
}

BarLoading.defaultProps = {
  message: '数据加载中',
  size: 0.9,
};

export default BarLoading;
