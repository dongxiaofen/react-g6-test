import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';
function DetailMain({accountSettingStore}) {
  const detailData = accountSettingStore.tabs.business.dailyDetail.content;
  const getReportType = (reportType) => {
    const reportMatch = {
      basicReportId: '初级报告',
      analysisReportId: '贷中分析',
      monitorId: '贷后监控',
      reportId: '高级报告'
    };
    return reportMatch[reportType];
  };

  const createTags = (data) => {
    const tags = [];
    Object.keys(data).map(item => {
      if (item !== 'companyName') {
        tags.push(<span key={data[item]}>{getReportType(item)}</span>);
      }
    });
    return tags;
  };

  const createList = () => {
    const output = [];
    detailData.map((item, idx) => {
      output.push(
        <li key={'detail' + idx} className={styles['list-item']}>
          <p className={styles['company-name']}><a>{item.companyName}</a></p>
          <p className={styles.tags}>已查： {createTags(item)}</p>
        </li>
      );
    });
    return output;
  };

  return (
    <div className={styles.main}>
      <ul className={styles['list-box']}>
        {createList()}
      </ul>
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.business.dailyDetail.content === undefined ? true : false,
    error: props.accountSettingStore.tabs.business.dailyDetail.error,
    height: 500,
    errCategory: 1,
    category: 0,
  }),
})(observer(DetailMain));
