import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function NewAccountHeader({}) {
  return (
    <div className={`${styles.header} clearfix`}>
      <i className={`${styles.account_icon_warning} pull-left`}></i>
      <h2 className="pull-left">最新预警账号</h2>
    </div>
  );
}

NewAccountHeader.propTypes = {
  foo: PropTypes.string,
};
export default observer(NewAccountHeader);
