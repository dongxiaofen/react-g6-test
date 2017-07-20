import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import errorPage from 'imgs/blackScan/errorPage.png';

function ErrorPage() {
  return (
    <div className={styles.wrap}>
      <img src={errorPage} alt="error" />
      <p>数据异常，系统正在努力修复中，请拨打 <span>400-139-1819</span> 联系我们</p>
    </div>
  );
}

export default observer(ErrorPage);
