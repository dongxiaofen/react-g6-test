import React from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';
function Footer({source, url}) {
  if (source) {
    return (
      <div className={styles.sourceHasUrl}>
        <a href={url} target="_bank">
          <span>信息来源：</span>
          {source}
        </a>
      </div>
    );
  }
  return (
    <div className={styles.sourceHasUrl}>
      <a href={url} target="_bank">
        <span>查看信息来源</span>
      </a>
    </div>
  );
}
export default observer(Footer);
