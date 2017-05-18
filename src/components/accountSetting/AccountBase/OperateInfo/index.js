import React from 'react';
import { observer } from 'mobx-react';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import Item from '../Item';
import styles from './index.less';
function OperateInfo({accountSettingStore, clientStore}) {
  const consumeType = clientStore.userInfo.consumeType;
  const data = accountSettingStore.base.data;
  let output = (
    <div className={styles.animateBox}>
      <AnimateLoading />
    </div>
  );
  if (data) {
    const config = [
      {
        name: '快速查询报告',
        keys: 'freeReportNum',
        remainKey: '',
        unit: '个',
      },
      {
        name: '高级查询报告',
        keys: 'reportCount',
        remainKey: '',
        unit: '个',
      },
      {
        name: '深度评估报告',
        keys: 'analysisReportCount',
        remainKey: '',
        unit: '个',
      },
      {
        name: '监控主体报告',
        keys: 'monitorCount',
        remainKey: '',
        unit: '个',
      },
      {
        name: '个人核查',
        keys: 'personCheckCount',
        remainKey: '',
        unit: '个',
      },
      {
        name: '税务核查指标',
        keys: 'taxCheckCount',
        remainKey: '',
        unit: '个',
      },
    ];
    const content = config.map((item, idx) => {
      return (
        <Item
          key={idx}
          {...item}
          remainValue={data[item.remainKey]}
          feeset={consumeType === 'FEESET' && !data.parentUserId}
          values={data[item.keys]} />
      );
    });
    output = content;
  }
  return (
    <div className={styles.infoBox}>
      <h2 className={styles.operateTitle}>操作记录</h2>
      {output}
    </div>
  );
}

export default observer(OperateInfo);
