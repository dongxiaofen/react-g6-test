import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
export default observer(({isLogin}) => {
  return (
    <div className={styles.box}>
      {isLogin ? '欢迎' : '未登录'}
    </div>
  );
});
