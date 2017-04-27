import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import BaseList from './BaseList';
import pathval from 'pathval';
import styles from './index.less';
import Pager from 'components/common/Pager';
import { loadingComp } from 'components/hoc';


function TableList({ reportManageStore, uiStore }) {
  return (
      <div>
        <div className={styles.table}>
          {
            pathval.getPathValue(reportManageStore, 'list.data.content') ? pathval.getPathValue(reportManageStore, 'list.data.content').map((item, index) =>
              <BaseList key={`reportManage${index}Id`} listData={item}/>) : ''
          }
        </div>
        <div className={styles.pages}>
          <Pager tData={pathval.getPathValue(reportManageStore, 'list.data.content')} module="reportManagePager"
                 uiStore={uiStore} type="large"/>
        </div>
      </div>
    );
}

TableList.propTypes = {
  foo: PropTypes.string,
};
export default inject('reportManageStore', 'uiStore')(loadingComp(
  {mapDataToProps: props=> ({
    loading: pathval.getPathValue(props.reportManageStore, 'list.data.content') === null ? true : false,
    imgCategory: 14,
    category: 2,
  })}
)(observer(TableList)));
