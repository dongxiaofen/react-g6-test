import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function ErrorPage({ funcObj, reportId }) {
  const reGetFunc = () => {
    funcObj.getStatus(reportId);
  };
  return (
    <div>
      获取失败
      <button onClick={reGetFunc} className={styles.reGetBtn}>重新获取</button>
    </div>
  );
}

export default observer(ErrorPage);
