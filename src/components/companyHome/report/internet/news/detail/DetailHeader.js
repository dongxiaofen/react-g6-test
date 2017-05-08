import React from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
function DetailHeader({internetStore}) {
  const {type, label, time, title} = internetStore.detailInfo;
  return (
    <div className={styles.header}>
      <p className={styles.title}>新闻详情</p>
      <div className={styles.marginRow}>
        <span className={styles.type}>{type}</span>
        <span className={styles.label}>{label}</span>
        <span className={styles.newsTime}>{`发布日期：${time}`}</span>
      </div>
      <span className={styles.newsTitle}>{`新闻标题：${title}`}</span>
    </div>
  );
}

export default inject('internetStore')(observer(DetailHeader));
