import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import AccountTable from '../AccountTable';
import styles from './index.less';
function Recharge({accountSettingStore}) {
  const handleDetail = (value, item) => {
    return '等待api' + item.detail;
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
