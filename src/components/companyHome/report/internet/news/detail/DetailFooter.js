import React from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
function DetailFooter({internetStore}) {
  const { url, source } = internetStore.detailInfo;
  return (
    <a className={styles.footer} href={url} target="_blank">{`信息来源：${source}`}</a>
  );
}

export default inject('internetStore')(observer(DetailFooter));
