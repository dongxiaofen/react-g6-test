import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import BaseList from '../BaseList';
import pathval from 'pathval';
import Pagination from 'components/lib/pagination';
import { runInAction } from 'mobx';
import styles from './index.less';

function TableList({ reportManageStore }) {
  const changePages = (newPage) => {
    runInAction('newPage...', () => {
      pathval.setPathValue(reportManageStore, 'params.index', newPage);
    });
    reportManageStore.getReportList(pathval.getPathValue(this.props, 'reportManageStore.params'));
  };
  return (
  <div>
    <div className={styles.table}>
      {
        pathval.getPathValue(reportManageStore, 'list.data.content') ? pathval.getPathValue(reportManageStore, 'list.data.content').map((item, index) =>
          <BaseList key={`reportManage${index}Id`} listData={item}/>) : ''
      }
    </div>
    <div className={styles.pages}>
      <Pagination
        current={pathval.getPathValue(reportManageStore, 'params.index')}
        pageSize={10}
        total={pathval.getPathValue(reportManageStore, 'list.data.totalElements') ? pathval.getPathValue(reportManageStore, 'list.data.totalElements') : 0}
        onChange={changePages.bind(this)}
      />
    </div>
  </div>
  );
}

TableList.propTypes = {
  foo: PropTypes.string,
};
export default inject('reportManageStore')(observer(TableList));
