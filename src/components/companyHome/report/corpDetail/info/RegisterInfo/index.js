import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, KvTable } from 'components/common/report';
// import styles from './index.less';

function RegisterInfo({ registerInfo, isLoading }) {
  // console.log('registerInfo', registerInfo);
  const handleRegCap = () => {
    const items = registerInfo[0];
    if (items.regCap === '0.0' || items.regCap === '0' || items.regCap === '' || items.regCap === undefined) {
      return '--';
    }
    return items.regCap + items.unit + items.regCapCur;
  };
  const data = {
    meta: [
      { 'key': 'enterpriseName', 'type': 'half' },
      { 'key': 'regNo', 'type': 'half' },
      { 'key': 'orgNum', 'type': 'half' },
      { 'key': 'socialCreditIdentifier', 'type': 'half' },
      { 'key': 'frName', 'type': 'half' },
      { 'key': 'enterpriseType', 'type': 'half' },
      { 'key': 'regCap', 'type': 'half', 'modifyText': handleRegCap },
      { 'key': 'address', 'type': 'half' },
      { 'key': 'regOrg', 'type': 'half' },
      { 'key': 'enterpriseStatus', 'type': 'half' },
      { 'key': 'esDate', 'type': 'full' },
      { 'key': 'operateScope', 'type': 'full' },
    ],
    items: registerInfo[0],
    dict: 'RegisterInfo',
    isLoading: isLoading,
    module: '注册信息',
    error: registerInfo.length === 0
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
