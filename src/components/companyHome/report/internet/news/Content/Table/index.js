import React from 'react';
import { observer, inject } from 'mobx-react';
import Config from 'dict/reportModule';
import styles from './index.less';
function Table({data, internetStore, companyHomeStore}) {
  const activeUrl = internetStore.activeUrl;
  const mapLabelToType = (label) => {
    if (!label) {
      return '其他新闻';
    }
    return Object.keys(Config.newsDict).map(key => {
      if (Config.newsDict[key].includes(label)) {
        return key;
      }
    });
  };
  const viewNews = (item) => {
    const { createdAt, url } = item;
    const { reportId, basicReportId } = companyHomeStore.reportInfo;
    let getUrl;
    if (reportId) {
      getUrl = `/api/report/${reportId}/internet/detail?createdAt=${createdAt}&url=${url}`;
    } else if (basicReportId) {
      getUrl = `/api/basicReport/${basicReportId}/internet/detail?createdAt=${createdAt}&url=${url}`;
    } else {
      return false;
    }
    const detail = {
      type: mapLabelToType(item.label),
      label: item.label,
      time: item.publishTime,
      title: item.title,
      source: item.source,
      url: item.url,
    };
    internetStore.assignDetail(detail);
    internetStore.getNewsDetail(getUrl, url);
  };
  return (
    <div>
      {data.map(item => {
        return (
          <div key={item.scId} className={styles.itemBox}>
            <div className={styles.labelLine}>
              <span className={styles.type}>
                {mapLabelToType(item.label)}
              </span>
              <span className={styles.label}>
                {item.label}
              </span>
              <span
                className={styles.viewBtn}
                onClick={viewNews.bind(null, item)}>
                {activeUrl === item.url ? '获取中' : '全文'}
              </span>
            </div>
            <div>
              <span className={styles.newsTitle}>新闻标题：{item.title}</span>
              <span className={styles.newsTime}>{item.publishTime}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default inject('internetStore', 'companyHomeStore')(observer(Table));
