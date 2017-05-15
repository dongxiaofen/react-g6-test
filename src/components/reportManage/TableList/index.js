import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import BaseList from './BaseList';
import styles from './index.less';
import Pager from 'components/common/Pager';
import { loadingComp } from 'components/hoc';


function TableList({ listData, status, uiStore }) {
  return (
    <div>
      <div className={styles.list}>
        {
          listData && listData.length > 0
            ?
            listData.map((item, key) => <BaseList key={`reportManage${key}Id`} status={status} item={item} />)
            : null
        }
      </div>
      <div className={styles.pager}>
        <Pager
          tData={listData}
          module="reportManagePager"
          uiStore={uiStore}
          type="large" />
      </div>
    </div>
  );
}

TableList.propTypes = {
  listData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  status: PropTypes.string,
  loading: PropTypes.bool,
  uiStore: PropTypes.object,
};
export default inject('uiStore')(loadingComp(
  {mapDataToProps: props=> ({
    loading: props.loading,
    imgCategory: 14,
    category: 2,
    errCategory: 2,
    module: props.status === 'report' ? '高级查询报告列表' : '深度分析报告列表',
    error: props.listData.length === 0,
  })}
)(observer(TableList)));
