import React from 'react';
import { observer } from 'mobx-react';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import Item from '../Item';
import styles from './index.less';
function OperateInfo({baseInfo}) {
  const config = [
    {
      name: '高级查询报告',
      keys: 'reportCount',
      unit: '个',
    },
    {
      name: '深度评估报告',
      keys: 'analysisReportCount',
      unit: '个',
    },
    {
      name: '监控主体报告',
      keys: 'monitorCount',
      unit: '个',
    },
    {
      name: '个人核查',
      keys: 'personCheckCount',
      unit: '个',
    },
  ];
  let output = (
    <div className={styles.animateBox}>
      <AnimateLoading />
    </div>
  );
  if (baseInfo.data) {
    const content = config.map((item, idx) => {
      return (
        <Item
          key={idx}
          {...item}
          values={baseInfo.data[item.keys]} />
      );
    });
    output = content;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.infoBox}>
        <h2 className={styles.operateTitle}>操作记录</h2>
        {output}
      </div>
    </div>
  );
}

export default observer(OperateInfo);
