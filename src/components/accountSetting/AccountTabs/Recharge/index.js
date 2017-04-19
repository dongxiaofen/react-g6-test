import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import AccountTable from '../AccountTable';
import styles from './index.less';
function Recharge({accountSettingStore}) {
  const handleSource = (value) => {
    return value === 'ADMIN' ? '后台充值' : value;
  };
  const handleMoney = (value) => {
    return value || '- -';
  };
  const head = [
    {name: '充值编号', key: 'seqNum'},
    {name: '充值方式', key: 'source', handle: handleSource},
    {name: '支付金额', key: 'money', handle: handleMoney},
    {name: '充值点数', key: 'point'},
    {name: '操作时间', key: 'opTime'},
  ];
  const changePage = (newPage) => {
    const uId = accountSettingStore.base.data.id;
    accountSettingStore.changeValue('tabs.rechargePager.index', newPage);
    accountSettingStore.getRecharge(uId);
  };
  const data = accountSettingStore.tabs.recharge;
  const params = accountSettingStore.tabs.rechargePager;
  return (
    <div className={styles.wrapper}>
      <AccountTable
        headData={head}
        bodyData={data.content}
        pageParams={params}
        totalElements={data.totalElements}
        pageChange={changePage} />
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.recharge.content === undefined ? true : false,
    error: props.accountSettingStore.tabs.recharge.error,
    category: 2,
  }),
})(observer(Recharge));
