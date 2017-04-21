import React from 'react';
import { observer } from 'mobx-react';
import MainTime from './MainTime';
import styles from './index.less';
function TimeWrap({data}) {
  return (
    <div className={styles.wrapper}>
      <MainTime keys="首次监控日期" values={data.startTm} />
      <MainTime keys="监控截止日期" values={data.stopTm} />
      <MainTime keys="最近更新日期" values={data.latestTs} />
    </div>
  );
}

export default observer(TimeWrap);
