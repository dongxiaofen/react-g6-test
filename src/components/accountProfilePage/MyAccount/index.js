import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function MyAccount({}) {
  return (
    <div>
          myAccount
    </div>
  );
}

MyAccount.propTypes = {
  foo: PropTypes.string,
};
export default observer(MyAccount);
