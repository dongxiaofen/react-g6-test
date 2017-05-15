import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import AccountTable from '../AccountTable';
import styles from './index.less';
function Consume({accountSettingStore}) {
  const timeMap = accountSettingStore.timeMap;
  const baseInfo = accountSettingStore.base.data;
  const consumeTypeMap = accountSettingStore.consumeTypeMap;
  const handleConsumeInfo = (value, item) => {
    const nameStr = item.companyName ? `企业：${item.companyName}` : '';
    const timeStr = item.timeType ? `；监控时长：${timeMap[item.timeType]}` : '';
    const personStr = item.memo ? `；核查人姓名：${item.memo}` : '';
    const taxStr = item.taxIndex ? `;${item.taxIndex}` : '';
    return nameStr + timeStr + personStr + taxStr;
  };
  const handleConsumeType = (value) => {
    return consumeTypeMap[value];
  };
  const head = [
    {name: '消费编号', key: 'seqNum'},
    {name: '消费类型', key: 'consumeOperationType', handle: handleConsumeType},
    {name: '操作时间', key: 'opTime'},
    {name: '消费点数', key: 'consume', none: baseInfo.consumeType !== 'POINT'},
    {name: '消费内容', key: 'consumeInfo', handle: handleConsumeInfo},
  ];
  const totalConsume = accountSettingStore.tabs.consume.totalConsume;
  const data = accountSettingStore.tabs.consume.page;
  return (
    <div className={styles.wrapper}>
      <div className={styles.totalConsume}>
        {`总消费点数 ${totalConsume || 0} 点`}
      </div>
      <AccountTable
        module="accountConsume"
        headData={head}
        bodyData={data.content} />
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.consume.page === undefined ? true : false,
    error: props.accountSettingStore.tabs.consume.error,
    category: 0,
    errCategory: 1,
    height: 200,
  }),
})(observer(Consume));
