import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import styles from './index.less';
import Checkbox from 'antd/lib/checkbox';

function CreateMonitor({modalStore}) {
  const onChange = () => {
    runInAction('turn off confirmDisable', ()=>{
      modalStore.confirmDisable = !modalStore.confirmDisable;
    });
  };
  return (
    <div className={styles.box}>
      <div className={styles.text}>
        尊敬的用户，根据相关规定，您通过平台查询、打印、使用企业相关信息前需要获得该企业的正式授权。
      </div>
      <div>
        <Checkbox
          checked={!modalStore.confirmDisable}
          onChange={onChange}>
          <span className={styles.checkbox}>请确定您已获得该企业正式授权</span>
        </Checkbox>
      </div>
    </div>
  );
}

CreateMonitor.propTypes = {
  foo: PropTypes.string,
};
export default inject('modalStore')(observer(CreateMonitor));
