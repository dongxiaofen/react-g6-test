import React from 'react';
import styles from './index.less';
function Title({monitorListStore}) {
  const activeList = monitorListStore.activeList;
  const dict = {
    monitorList: '监控列表',
    deepMonitorList: '深度监控列表',
  };
  return (
    <h1
      className={styles.titleCss}
      >
      {dict[activeList]}
    </h1>
  );
}
export default Title;
