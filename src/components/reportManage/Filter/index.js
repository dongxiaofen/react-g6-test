import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Input from 'components/lib/input';
import { runInAction } from 'mobx';
import pathval from 'pathval';

function Filter({ reportManageStore }) {
  const setFocus = (bool) => {
    runInAction('焦点状态', () => {
      pathval.setPathValue(reportManageStore, 'focus', bool);
    });
  };

  const inputName = (evt) => {
    runInAction('输入公司名称', () => {
      pathval.setPathValue(reportManageStore, 'params.companyName', evt.target.value);
    });
  };

  const searchCompany = () => {
    runInAction('搜索', () => {
      pathval.setPathValue(reportManageStore, 'searchWithCompany', pathval.getPathValue(reportManageStore, 'params.companyName'));
      pathval.setPathValue(reportManageStore, 'params.index', 1);
    });

    const params = pathval.getPathValue(reportManageStore, 'params');
    reportManageStore.getReportList(params);
  };

  const keyUpEvent = (evt) => {
    if (evt.keyCode === 13) {
      searchCompany();
    }
  };
  return (
    <div className={`${styles.wrap} ${reportManageStore.focus ? styles.Active : ''}`}>
      <Input className={styles.searchInput}
             onKeyUp={keyUpEvent}
             onChange={inputName}
             onFocus={setFocus.bind(this, true)}
             onBlur={setFocus.bind(this, false)}
             value={pathval.getPathValue(reportManageStore, 'params.companyName')}
             placeholder="输入企业名称" />
      <i className={`fa fa-search ${styles.searchIcon}`} onClick={searchCompany}></i>
    </div>
  );
}

Filter.propTypes = {
  foo: PropTypes.string,
};
export default inject('reportManageStore')(observer(Filter));
