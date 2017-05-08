import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

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
    <div className={styles.search}>
      {/* <div className={`clearfix ${styles.wrap} ${reportManageStore.focus ? styles.Active : ''}`}>
    </div> */}
      <i className="fa fa-search"></i>
      <input className={styles.input}
        onKeyUp={keyUpEvent}
        onChange={inputName}
        onFocus={setFocus.bind(this, true)}
        onBlur={setFocus.bind(this, false)}
        value={reportManageStore.companyName}
        placeholder="输入企业名称" />
    </div>
  );
}

Filter.propTypes = {
  reportManagePager: PropTypes.object,
  reportManageStore: PropTypes.object,
  status: PropTypes.string,
};
export default observer(Filter);
