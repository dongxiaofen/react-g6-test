import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Pagination from 'antd/lib/pagination';
import styles from './index.less';

function Pager({ tData, module, uiStore, type }) {
  const { index, size } = uiStore.uiState[module];
  if (tData.length <= size) {
    return null;
  }
  const pageChange = (pageIndex) => {
    uiStore.updateUiStore(`${module}.index`, pageIndex);
  };
  return (
    <div className={styles.wrap}>
      <div className={'clearfix ' + styles.pagination}>
        {
          type === 'small' ?
            <Pagination simple current={index} pageSize={size} total={tData.length} onChange={pageChange} /> :
            <Pagination showQuickJumper current={index} pageSize={size} total={tData.length} onChange={pageChange} />
        }
      </div>
    </div>
  );
}

Pager.propTypes = {
  tData: PropTypes.object.isRequired,
  module: PropTypes.string.isRequired,
  uiStore: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
export default inject('uiStore')(observer(Pager));
