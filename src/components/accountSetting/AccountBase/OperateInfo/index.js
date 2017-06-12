import React from 'react';
import { observer } from 'mobx-react';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import Item from '../Item';
import styles from './index.less';

function OperateInfo({accountSettingStore, clientStore, className}) {
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
        name: '查询报告',
        keys: 'reportCount',
        remainKey: 'leftReportNum',
        unit: '个',
      },
      {
        name: '监控报告',
        keys: 'monitorCount',
        remainKey: 'leftMonitorNum',
        unit: '个',
      },
      {
        name: '个人核查',
        keys: 'personCheckCount',
        remainKey: 'leftPersonCheckNum',
        unit: '个',
      },
      {
        name: '税务核查',
        keys: 'taxCheckCount',
        remainKey: 'leftTaxCheckNum',
        unit: '个',
      },
      {
        name: '消费点数',
        keys: 'userConsumePoint',
        remainKey: 'subUserConsumePoint',
        none: consumeType !== 'POINT' || data.parentUserId ? true : false,
        unit: '',
      },
      {
        name: '剩余点数',
        keys: 'point',
        remainKey: 'remainingPoint',
        none: consumeType !== 'POINT' || data.parentUserId ? true : false,
        unit: '',
      },
    ];
    const content = config.map((item, idx) => {
      return (
        <Item
          key={idx}
          {...item}
          Remaining={false}
          remainValue={data[item.remainKey]}
          feeset={consumeType === 'FEESET' && !data.parentUserId}
          values={data[item.keys]} />
      );
    });
    output = content;
  }
  return (
    <div className={`${styles.infoBox} ${className ? className : ''}`}>
      <h2 className={styles.operateTitle}>操作记录</h2>
      {output}
    </div>
  );
}

export default observer(OperateInfo);
