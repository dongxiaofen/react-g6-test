import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
function TypeFilter({ reportManageStore, uiStore }) {
  const filterConfig = [
    { name: '高级查询报告', status: 'report'},
    { name: '深度分析报告', status: 'analysisReport'},
  ];
  const changeFilter = (status) => {
    uiStore.updateUiStore('reportManageList.reportStatus', status);
    uiStore.updateUiStore('reportManagePager.index', 1);
    const reportManagePager = uiStore.uiState.reportManagePager;
    const params = {
      companyName: '',
      index: 1,
      size: reportManagePager.size
    };
    if (status === 'report') {
      reportManageStore.getReportList(params);
    } else {
      reportManageStore.getAnalysisReportList(params);
    }
  };
  const createFilter = () => {
    const output = [];
    const reportStatus = uiStore.uiState.reportManageList.reportStatus;
    filterConfig.forEach(item => {
      const cssName = reportStatus === item.status
        ? styles.activeFilterItem
        : styles.filterItem;
      output.push(
        <div key={item.name}
          className={cssName}
          onClick={changeFilter.bind(null, item.status)}>
          {item.name}
        </div>
      );
    });
    return output;
  };
  return (
    <div className={`clearfix ${styles.wrapper}`}>
      {createFilter()}
    </div>
  );
}

TypeFilter.propTypes = {
  reportManageStore: PropTypes.object,
  uiStore: PropTypes.object,
};

export default inject('uiStore')(observer(TypeFilter));
