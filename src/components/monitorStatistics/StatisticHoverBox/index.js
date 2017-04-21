import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function StatisticHoverBox({ children, leftArrow, topArrow}) {
  return (
    <div style={{ width: '100%' }}>
      <div className={styles['shadow-box']}>
        <div
          className={
            leftArrow
              ? styles['shadow-show']
              : styles['shadow-hide']
          }>
          <div className={styles['shadow-arrow-left']}></div>
          <div className={styles['shadow-arrow-left-block']}></div>
        </div>
        <div
          className={
            topArrow
              ? styles['shadow-show']
              : styles['shadow-hide']
          }>
          <div className={styles['shadow-arrow-top']}></div>
          <div className={styles['shadow-arrow-top-block']}></div>
        </div>
        {children}
      </div>
    </div>
  );
}

StatisticHoverBox.propTypes = {
  children: PropTypes.node,
  leftArrow: PropTypes.string,
  topArrow: PropTypes.string,
};
export default observer(StatisticHoverBox);
