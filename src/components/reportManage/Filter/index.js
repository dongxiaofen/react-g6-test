import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Input from 'components/lib/input';

function Filter({ reportManageStore, reportManagePager, status }) {
  const setFocus = (bool) => {
    reportManageStore.setFocus(bool);
  };

  const inputName = (evt) => {
    reportManageStore.setCompanyName(evt.target.value);
  };

  const searchCompany = () => {
    const params = {
      companyName: reportManageStore.companyName,
      index: 1,
      size: reportManagePager.size
    };
    if (status === 'report') {
      reportManageStore.getReportList(params);
    } else {
      reportManageStore.getAnalysisReportList(params);
    }
  };

  const keyUpEvent = (evt) => {
    if (evt.keyCode === 13) {
      searchCompany();
    }
  };
  return (
    <div className={`clearfix ${styles.wrap} ${reportManageStore.focus ? styles.Active : ''}`}>
      <Input className={styles.searchInput}
             onKeyUp={keyUpEvent}
             onChange={inputName}
             onFocus={setFocus.bind(this, true)}
             onBlur={setFocus.bind(this, false)}
             value={reportManageStore.companyName}
             placeholder="输入企业名称" />
      <i className={`fa fa-search ${styles.searchIcon}`} onClick={searchCompany}></i>
    </div>
  );
}

Filter.propTypes = {
  reportManagePager: PropTypes.object,
  reportManageStore: PropTypes.object,
  status: PropTypes.string,
};
export default observer(Filter);
