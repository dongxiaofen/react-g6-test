import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function NewAccount({}) {
  return (
    <div>
      <div className={`${styles.header} clearfix`}>
        <i className={`${styles.account_icon_warning} pull-left`}></i>
        <h2 className="pull-left">最新预警账号</h2>
      </div>
    </div>
  );
}

NewAccount.propTypes = {
  foo: PropTypes.string,
};
export default observer(NewAccount);
