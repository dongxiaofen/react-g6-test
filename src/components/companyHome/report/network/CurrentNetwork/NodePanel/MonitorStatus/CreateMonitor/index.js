import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CreateMonitor({}) {
  return (
    <div className={styles.text}>
      尊敬的用户，根据相关规定，您通过平台查询、打印、使用企业相关信息前需要获得该企业的正式授权。
    </div>
  );
}

CreateMonitor.propTypes = {
  foo: PropTypes.string,
};
export default observer(CreateMonitor);
