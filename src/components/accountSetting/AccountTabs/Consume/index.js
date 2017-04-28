import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import AccountTable from '../AccountTable';
import styles from './index.less';
function Consume({accountSettingStore}) {
  const timeMap = {
    ONE_MONTH: '1个月',
    TWO_MONTH: '2个月',
    THREE_MONTH: '3个月',
    FOUR_MONTH: '4个月',
    FIVE_MONTH: '5个月',
    SIX_MONTH: '6个月',
    SEVEN_MONTH: '7个月',
    EIGHT_MONTH: '8个月',
    NINE_MONTH: '9个月',
    ONE_YEAR: '1年',
  };
  const consumeType = {
    REPORT_MAIN: '生成主体报告',
    MONITOR_MAIN: '创建主体监控',
    REPORT_REFRESH: '刷新主体报告',
    REPORT_TO_MONITOR: '报告转监控',
    MONITOR_MAIN_RENEWAL: '主体监控续费',
    PERSON_CHECK: '个人核查',
  };
  const handleConsumeInfo = (value, item) => {
    const nameStr = item.companyName ? `企业：${item.companyName}` : '';
    const timeStr = item.timeType ? `；监控时长：${timeMap[item.timeType]}` : '';
    const personStr = item.memo ? `；核查人姓名：${item.memo}` : '';
    return nameStr + timeStr + personStr;
  };
  const handleConsumeType = (value) => {
    return consumeType[value];
  };
  const head = [
    {name: '消费编号', key: 'seqNum'},
    {name: '消费类型', key: 'consumeOperationType', handle: handleConsumeType},
    {name: '操作时间', key: 'opTime'},
    {name: '消费点数', key: 'consume'},
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
