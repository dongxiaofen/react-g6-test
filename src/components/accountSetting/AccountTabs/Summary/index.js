import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import AccountTable from '../AccountTable';
import styles from './index.less';
function Summary({accountSettingStore}) {
  const timeMap = accountSettingStore.timeMap;
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
  const handleName = (value, item) => {
    return `${value}（${item.operatorEmail}）`;
  };
  const head = [
    {name: '消费编号', key: 'seqNum', width: '15%'},
    {name: '消费类型', key: 'consumeOperationType', width: '15%', handle: handleConsumeType},
    {name: '操作时间', key: 'opTime', width: '15%'},
    {name: '消费内容', key: 'consumeInfo', handle: handleConsumeInfo},
    {name: '操作人', key: 'operatorName', handle: handleName},
  ];
  const data = accountSettingStore.tabs.summary.content;
  return (
    <div className={styles.wrapper}>
      <AccountTable
        module="accountSummary"
        headData={head}
        bodyData={data} />
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.summary.content === undefined ? true : false,
    error: props.accountSettingStore.tabs.summary.error,
    category: 0,
    errCategory: 1,
    height: 200,
  }),
})(observer(Summary));
