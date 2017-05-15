import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';


function SubAccount({}) {
  return (
    <div>
          subAccount
    </div>
  );
}

SubAccount.propTypes = {
  foo: PropTypes.string,
};
export default observer(SubAccount);
