import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function UpdateDeep() {
  return (
    <div className={styles.text}>
      升级为深度分析报告
        <span className={styles.textSub}>
        （包含高级查询报告数据，另有企业税务分析、综合信息分析、预警分析）
        </span>
    </div>
  );
}

export default observer(UpdateDeep);
