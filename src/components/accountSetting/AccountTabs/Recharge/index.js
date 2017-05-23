import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import AccountTable from '../AccountTable';
import styles from './index.less';
function Recharge({accountSettingStore}) {
  const handleDetail = (value, item) => {
    const point = item.point ? `点数${item.point > 0 ? '增加' : '减少'} ${Math.abs(item.point)} 点` : '';
    const reportCount = item.reportCount ? `查询报告 ${item.reportCount} 个` : '';
    const monitorCount = item.monitorCount ? `监控报告 ${item.monitorCount} 个` : '';
    const personCheckCount = item.personCheckCount ? `个人核查 ${item.personCheckCount} 个` : '';
    const taxCheckCount = item.taxCheckCount ? `税务核查指标 ${item.taxCheckCount} 个` : '';
    return [point, reportCount, monitorCount, personCheckCount, taxCheckCount].filter(val => val !== '').join('; ');
  };
  const head = [
    {name: '充值编号', key: 'seqNum', width: '25%'},
    {name: '操作时间', key: 'opTime', width: '25%'},
    {name: '充值详情', key: 'detail', handle: handleDetail},
  ];
  const data = accountSettingStore.tabs.recharge;
  return (
    <div className={styles.wrapper}>
      <AccountTable
        module="accountRecharge"
        headData={head}
        bodyData={data.content} />
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.recharge.content === undefined ? true : false,
    error: props.accountSettingStore.tabs.recharge.error,
    category: 0,
    errCategory: 1,
    height: 200,
  }),
})(observer(Recharge));
