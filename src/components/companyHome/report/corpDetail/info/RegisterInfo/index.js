import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function RegisterInfo({registerInfo}) {
  console.log('registerInfo', registerInfo);
  return (
    <div>
      RegisterInfo
    </div>
  );
}

RegisterInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(RegisterInfo);
