import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Pagination from 'antd/lib/pagination';
import styles from './index.less';

function Pager({ tData, module, uiStore, type }) {
  const { index, size, totalElements } = uiStore.uiState[module];
  const dataLength = totalElements ? totalElements : (tData && tData.length || 0);
  if (dataLength <= size) {
    return null;
  }
  const pageChange = (pageIndex) => {
    uiStore.updateUiStore(`${module}.index`, pageIndex);
  };
  return (
    <div className={`clearfix ${type === 'small' ? styles.pagination : styles.paginationLarge}`}>
      {
        type === 'small' ?
          <Pagination simple current={index} pageSize={size} total={dataLength} onChange={pageChange} /> :
          <Pagination showQuickJumper current={index} pageSize={size} total={dataLength} onChange={pageChange} />
      }
    </div>
  );
}

Pager.propTypes = {
  tData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  module: PropTypes.string,
  uiStore: PropTypes.object,
  type: PropTypes.string,
};
export default inject('uiStore')(observer(Pager));
