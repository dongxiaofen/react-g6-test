import React from 'react';
import { observer, inject } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';
function DetailMain({accountSettingStore, routing}) {
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

  const sortTags = (data) => {
    const sortArr = [];
    data.map(str => {
      if (str !== 'companyName') {
        switch (str) {
          case 'basicReportId':
            sortArr[0] = str;
            break;
          case 'reportId':
            sortArr[1] = str;
            break;
          case 'analysisReportId':
            sortArr[2] = str;
            break;
          case 'monitorId':
            sortArr[3] = str;
            break;
          default:
            sortArr[0] = str;
        }
      }
    });
    return sortArr;
  };

  const handleSearch = (companyName) => {
    routing.push(`/companyHome/corpDetail?companyName=${companyName}`);
  };

  const createTags = (data) => {
    const tags = [];
    sortTags(Object.keys(data)).map(item => {
      if (item !== 'companyName' && getReportType(item)) {
        tags.push(<span key={data[item]} className={styles['tags-item']}>{getReportType(item)}</span>);
      }
    });
    return tags;
  };

  const createList = () => {
    const output = [];
    detailData.map((item, idx) => {
      output.push(
        <li key={'detail' + idx} className={styles['list-item']}>
          <p className={styles['company-name']}><a onClick={handleSearch.bind(this, item.companyName)}>{item.companyName}</a></p>
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
    height: 400,
    errCategory: 1,
    category: 0,
  }),
})(inject('routing')(observer(DetailMain)));