import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function AnimateLoading({ animateCategory}) {
  if (animateCategory) {
    return (
      <div className={styles.animateLoading}>
        <div className={styles['sk-small-wave']}>
          <div className={`${styles['sk-small-rect']} ${styles['sk-small-rect1']}`}></div>
          <div className={`${styles['sk-small-rect']} ${styles['sk-small-rect2']}`}></div>
          <div className={`${styles['sk-small-rect']} ${styles['sk-small-rect3']}`}></div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.animateLoading}>
      <div className={styles['sk-wave']}>
        <div className={`${styles['sk-rect']} ${styles['sk-rect1']}`}></div>
        <div className={`${styles['sk-rect']} ${styles['sk-rect2']}`}></div>
        <div className={`${styles['sk-rect']} ${styles['sk-rect3']}`}></div>
        <div className={`${styles['sk-rect']} ${styles['sk-rect4']}`}></div>
        <div className={`${styles['sk-rect']} ${styles['sk-rect5']}`}></div>
      </div>
    </div>
  );
}

AnimateLoading.propTypes = {
  animateCategory: PropTypes.number,
};
export default observer(AnimateLoading);
