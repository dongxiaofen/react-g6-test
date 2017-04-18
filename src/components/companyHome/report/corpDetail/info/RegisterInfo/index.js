import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, KvTable } from 'components/common/report';
// import styles from './index.less';

function RegisterInfo({ registerInfo, isLoading }) {
  // console.log('registerInfo', registerInfo);
  const data = {
    meta: [
      { 'key': 'enterpriseName', 'type': 'half'},
      { 'key': 'regNo', 'type': 'half'},
      { 'key': 'orgNum', 'type': 'half'},
      { 'key': 'socialCreditIdentifier', 'type': 'half'},
      { 'key': 'frName', 'type': 'half'},
      { 'key': 'enterpriseType', 'type': 'half'},
      { 'key': 'regCap', 'type': 'half', 'handleBlock': this.handleRegCap},
      { 'key': 'address', 'type': 'half'},
      { 'key': 'regOrg', 'type': 'half'},
      { 'key': 'enterpriseStatus', 'type': 'half'},
      { 'key': 'esDate', 'type': 'full'},
      { 'key': 'operateScope', 'type': 'full'},
    ],
    items: registerInfo[0],
    dict: 'RegisterInfo',
    isLoading: isLoading
  };
  return (
    <div>
      <ModuleTitle module="注册信息" />
      <KvTable {...data} />
    </div>
  );
}

RegisterInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(RegisterInfo);
