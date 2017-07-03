import React from 'react';
import styles from './index.less';
import waitingPng from 'imgs/waiting.png';
function Waiting({watingInfo}) {
  return (
    <div className={styles.wrap}>
      <img src={waitingPng} />
      <p>{watingInfo}</p>
    </div>
  );
}

export default Waiting;
