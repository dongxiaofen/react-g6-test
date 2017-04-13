import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {ModuleTitle} from 'components/common/report';
// import styles from './index.less';

function RegisterInfo({registerInfo}) {
  console.log('registerInfo', registerInfo);
  return (
    <div>
      <ModuleTitle module="注册信息" />
    </div>
  );
}

RegisterInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(RegisterInfo);
