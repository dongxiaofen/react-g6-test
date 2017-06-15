import React from 'react';
import errorPng from 'imgs/error.png';
import styles from './index.less';

function NoBalance({message}) {
  return (
    <div className={styles.wrap}>
      <img src={errorPng} alt="error" />
      <p>{message}</p>
    </div>
  );
}

export default NoBalance;
