import React from 'react';
import { observer, inject } from 'mobx-react';
import SimpleTabs from 'components/common/SimpleTabs';
import styles from './index.less';
function NewsTabs({internetStore, uiStore, companyHomeStore}) {
  const statistic = internetStore.statistic.data;
  const activeType = uiStore.uiState.news.type;
  if (!statistic) {
    return null;
  }
  const typeHandle = (type) => {
    if (type !== activeType) {
      uiStore.updateUiStore('news.type', type);
      uiStore.updateUiStore('news.index', 1);
      const reportInfo = companyHomeStore.reportInfo;
      const params = uiStore.uiState.news;
      internetStore.getInternet(reportInfo, params);
    }
  };
  const getCount = key => {
    let count;
    for (let idx = 0; idx < statistic.length; idx++) {
      if (statistic[idx].key === key) {
        count = statistic[idx].count;
        break;
      }
    }
    return count || 0;
  };
  const tabData = [
    {label: '全部新闻', key: 'ALL', number: getCount('ALL')},
    {label: '企业战略', key: 'NEWS_STRATEGY', number: getCount('NEWS_STRATEGY')},
    {label: '诉讼纠纷', key: 'NEWS_LITIGATION', number: getCount('NEWS_LITIGATION')},
    {label: '经营状况', key: 'NEWS_BUSINESS', number: getCount('NEWS_BUSINESS')},
    {label: '品牌产品', key: 'NEWS_BRAND', number: getCount('NEWS_BRAND')},
    {label: '人事变动', key: 'NEWS_PERSONNEL', number: getCount('NEWS_PERSONNEL')},
    {label: '其他新闻', key: 'NEWS_OTHER', number: getCount('NEWS_OTHER')},
  ];
  return (
    <div className={styles.tabsBox}>
      <SimpleTabs data={tabData} active={activeType} clickHandel={typeHandle} />
    </div>
  );
}
export default inject('uiStore', 'companyHomeStore')(observer(NewsTabs));
