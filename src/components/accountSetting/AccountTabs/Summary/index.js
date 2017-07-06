import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import AccountTable from '../AccountTable';
import styles from './index.less';
function Summary({accountSettingStore, clientStore}) {
  const timeMap = accountSettingStore.timeMap;
  const consumeTypeMap = accountSettingStore.consumeTypeMap;
  const taxTypeMap = accountSettingStore.taxTypeMap;
  const handleConsumeInfo = (value, item) => {
    const nameStr = item.companyName ? `企业：${item.companyName}` : '';
    const timeStr = item.timeType ? `监控时长：${timeMap[item.timeType]}` : '';
    const personStr = item.checkPerson ? `核查人姓名：${item.checkPerson}` : '';
    const taxStr = item.taxIndex ? `核查${taxTypeMap[item.taxIndex]}` : '';
    return [
      `${item.consumeOperationType === 'PERSON_CHECK' ? '' : nameStr}`,
      `${item.consumeOperationType === 'MONITOR_MAIN' || item.consumeOperationType === 'MONITOR_MAIN_RENEWAL' || item.consumeOperationType === 'REPORT_TO_MONITOR' ? timeStr : ''}`,
      personStr,
      taxStr
    ].filter( (val) => val !== '').join(';');
    // return nameStr + `${item.consumeOperationType === 'MONITOR_MAIN' || item.consumeOperationType === 'MONITOR_MAIN_RENEWAL' || item.consumeOperationType === 'REPORT_TO_MONITOR' ? timeStr : ''}` + personStr + taxStr;
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
    {name: '消费点数', key: 'consume', width: '15%', none: clientStore.userInfo.consumeType !== 'POINT'},
    {name: '操作人', key: 'operatorName', handle: handleName},
  ];
  const data = accountSettingStore.tabs.summary.content;
  const consumePointTotal = accountSettingStore.base.data.subUserConsumePoint;
  return (
    <div className={styles.wrapper}>
      <div className={styles.totalConsume}>
        {`总消费点数 ${consumePointTotal || 0}`}
      </div>
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