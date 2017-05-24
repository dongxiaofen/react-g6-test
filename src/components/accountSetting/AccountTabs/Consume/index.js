import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import AccountTable from '../AccountTable';
import styles from './index.less';
function Consume({accountSettingStore}) {
  const timeMap = accountSettingStore.timeMap;
  const consumeTypeMap = accountSettingStore.consumeTypeMap;
  const taxTypeMap = accountSettingStore.taxTypeMap;
  const handleConsumeInfo = (value, item) => {
    const nameStr = item.companyName ? `企业：${item.companyName}` : '';
    const timeStr = item.timeType ? `；监控时长：${timeMap[item.timeType]}` : '';
    const personStr = item.checkPerson ? `；核查人姓名：${item.checkPerson}` : '';
    const taxStr = item.taxIndex ? `;核查${taxTypeMap[item.taxIndex]}` : '';
    return nameStr + timeStr + personStr + taxStr;
  };
  const handleConsumeType = (value) => {
    return consumeTypeMap[value];
  };
  const head = [
    {name: '消费编号', key: 'seqNum', width: '15%'},
    {name: '消费类型', key: 'consumeOperationType', width: '15%', handle: handleConsumeType},
    {name: '操作时间', key: 'opTime', width: '15%'},
    {name: '消费内容', key: 'consumeInfo', handle: handleConsumeInfo},
  ];
  const data = accountSettingStore.tabs.consume.content;
  return (
    <div className={styles.wrapper}>
      <AccountTable
        module="accountConsume"
        headData={head}
        bodyData={data} />
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.consume.content === undefined ? true : false,
    error: props.accountSettingStore.tabs.consume.error,
    category: 0,
    errCategory: 1,
    height: 200,
  }),
})(observer(Consume));
