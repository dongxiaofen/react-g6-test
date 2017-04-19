import React from 'react';
import { observer } from 'mobx-react';
import Pagination from 'components/lib/pagination';
import { loadingComp } from 'components/hoc';
import AccountTable from '../AccountTable';
import styles from './index.less';
function Consume({accountSettingStore}) {
  const consume = {
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
  const handleTimeType = (value) => {
    return consume[value];
  };
  const handleConsumeType = (value) => {
    return consumeType[value];
  };
  const handleMemo = (value, item) => {
    return item.consumeOperationType === 'PERSON_CHECK' ? `核查人姓名：${item.memo}` : '';
  };
  const changePage = (newPage) => {
    const uId = accountSettingStore.base.data.id;
    accountSettingStore.changeValue('tabs.consumePager.index', newPage);
    accountSettingStore.getConsume(uId);
  };
  const head = [
    {name: '消费编号', key: 'seqNum'},
    {name: '企业名称', key: 'companyName'},
    {name: '消费类型', key: 'consumeOperationType', handle: handleConsumeType},
    {name: '监控时长', key: 'timeType', handle: handleTimeType},
    {name: '消费点数', key: 'consume'},
    {name: '操作时间', key: 'opTime'},
    {name: '备注', key: 'memo', handle: handleMemo},
  ];
  const data = accountSettingStore.tabs.consume.page;
  const params = accountSettingStore.tabs.consumePager;
  return (
    <div className={styles.wrapper}>
      <AccountTable
        headData={head}
        bodyData={data.content} />
      <div className={styles.pagination}>
        <Pagination
          current={params.index}
          pageSize={params.size}
          total={data.totalElements}
          onChange={changePage}/>
      </div>
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.consume.page === undefined ? true : false,
    error: props.accountSettingStore.tabs.consume.error,
    category: 2,
  }),
})(observer(Consume));
