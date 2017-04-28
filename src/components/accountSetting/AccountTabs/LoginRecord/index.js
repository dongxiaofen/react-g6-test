import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import AccountTable from '../AccountTable';
import styles from './index.less';
function LoginRecord({accountSettingStore}) {
  const head = [
    {name: '登录时间', key: 'loginTime'},
    {name: '登录IP', key: 'ip'},
    {name: 'IP地址', key: 'address'},
  ];
  const data = accountSettingStore.tabs.loginRecord;
  return (
    <div className={styles.wrapper}>
      <AccountTable
        module="accountLoginRecord"
        headData={head}
        bodyData={data.content} />
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.loginRecord.content === undefined ? true : false,
    error: props.accountSettingStore.tabs.loginRecord.error,
    category: 2,
  }),
})(observer(LoginRecord));
