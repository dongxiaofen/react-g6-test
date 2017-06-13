import React from 'react';
import { observer } from 'mobx-react';
import BaseInfo from './BaseInfo';
import OperateInfo from './OperateInfo';
import Remaining from './Remaining';
import styles from './index.less';


function AccountBase(props) {
  const consumeType = props.clientStore.userInfo.consumeType;
  const root = props.clientStore.userInfo.root;
  const data = props.accountSettingStore.base.data;
  if (consumeType === 'FEESET' && root && data && data.parentUserId) {
    return (
      <div className={`${styles.wrapper} clearfix`}>
        <div className={`${styles.child_base_info} pull-left`}>
          <BaseInfo {...props} />
        </div>
        <div className={`${data && data.parentUserId ? styles.child_record_sub : styles.child_record} pull-right`}>
          <OperateInfo {...props} className={styles.operate_info} />
        </div>
      </div>
    );
  }
  if (consumeType === 'FEESET' && root) {
    return (
      <div className={styles.wrapper}>
        <BaseInfo {...props} />
        <div className={`${styles.host_style} clearfix`}>
          <div className={`${styles.child} pull-left`}>
            <OperateInfo {...props} />
          </div>
          <div className={`${styles.child} pull-right`}>
            <Remaining {...props} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`${styles.wrapper} clearfix`}>
      <div className={`${data && data.parentUserId ? styles.child_base_info_100 : styles.child_base_info } pull-left`}>
        <BaseInfo {...props} />
      </div>
      <div className={`${data && data.parentUserId ? styles.child_record_sub : styles.child_record} pull-right`}>
        <OperateInfo {...props} className={styles.operate_info} />
      </div>
    </div>
  );
}

export default observer(AccountBase);
