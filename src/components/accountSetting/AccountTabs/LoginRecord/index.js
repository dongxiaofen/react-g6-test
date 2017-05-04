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
  const loginCount = data.totalElements;
  return (
    <div className={styles.wrapper}>
      <div className={styles.loginCount}>
        {`总登录次数 ${loginCount || 0}`}
      </div>
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
    category: 0,
    errCategory: 1,
    height: 200,
  }),
})(observer(LoginRecord));
