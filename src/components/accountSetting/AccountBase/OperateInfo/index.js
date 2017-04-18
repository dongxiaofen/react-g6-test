import React from 'react';
import { observer } from 'mobx-react';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import Item from '../Item';
import styles from './index.less';
function OperateInfo({baseInfo}) {
  const config = [
    {
      name: '最近登录',
      keys: 'lastLoginTs',
    },
    {
      name: '登录次数',
      keys: 'loginCount',
      unit: '次',
    },
    {
      name: '高级报告',
      keys: 'reportCount',
      unit: '个',
    },
    {
      name: '刷新报告',
      keys: 'refreshReportCount',
      unit: '次',
    },
    {
      name: '创建监控',
      keys: 'monitorCount',
      unit: '个',
    },
    {
      name: '剩余点数',
      keys: 'point',
      none: baseInfo.data && baseInfo.data.parentUserId,
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
