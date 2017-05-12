import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function CommonBox({componentName, children}) {
  const titleDict = {
    newBusiness: '新增业务统计',
    provinceRank: '业务地区排名',
    industryDist: '行业分布',
    scaleDist: '规模分布',
  };
  const title = titleDict[componentName];
  return (
    <div className={styles[componentName]}>
      <div className={styles.bgBox}>
        <div className={styles.chartTitle}>{title}</div>
        {children}
      </div>
    </div>
  );
}
export default observer(CommonBox);
