import React from 'react';
import { observer, inject } from 'mobx-react';
import Config from 'dict/reportModule';
import styles from './index.less';
function Table({data, routing, internetStore}) {
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
    const {createdAt, url} = item;
    const {monitorId, reportId, companyName} = routing.location.query;
    let getUrl;
    if (monitorId) {
      getUrl = `/api/monitor/${monitorId}/internet/detail?createdAt=${createdAt}&url=${url}`;
    } else if (reportId) {
      getUrl = `/api/report/internet/detail?reportId=${reportId}&createdAt=${createdAt}&url=${url}`;
    } else if (companyName) {
      getUrl = `/api/report/internet/detail?companyName=${encodeURI(companyName)}&createdAt=${createdAt}&url=${url}`;
    } else {
      return false;
    }
    internetStore.getNewsDetail(getUrl);
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
                全文
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
export default inject('internetStore', 'routing')(observer(Table));
