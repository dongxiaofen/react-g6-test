import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Filter({ reportManageStore, uiStore, reportManagePager }) {
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
    const index = uiStore.uiState.reportManagePager.index;
    if (index === 1) {
      reportManageStore.getReportList(params);
    } else {
      uiStore.updateUiStore('reportManagePager.index', 1);
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
      <input className={styles.input}
        onKeyUp={keyUpEvent}
        onChange={inputName}
        onFocus={setFocus.bind(this, true)}
        onBlur={setFocus.bind(this, false)}
        value={reportManageStore.companyName}
        placeholder="输入企业名称" />
      <i className="fa fa-search"></i>
    </div>
  );
}

Filter.propTypes = {
  reportManagePager: PropTypes.object,
  reportManageStore: PropTypes.object,
  uiStore: PropTypes.object,
  status: PropTypes.string,
};
export default observer(Filter);
