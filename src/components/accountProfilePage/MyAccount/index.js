import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';
import Statistics from '../Statistics';

function MyAccount({}) {
  return (
    <div>
      <Statistics />
    </div>
  );
}

MyAccount.propTypes = {
  foo: PropTypes.string,
};
export default observer(MyAccount);
