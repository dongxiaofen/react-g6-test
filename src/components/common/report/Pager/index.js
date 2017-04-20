import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Pagination from 'components/lib/pagination';
import styles from './index.less';

function Pager({tData, dict, uiStore}) {
  const {index, size} = uiStore.uiState[dict];
  if (tData.length < size) {
    return null;
  }
  const pageChange = (pageIndex) =>{
    uiStore.updateUiStore(`${dict}.index`, pageIndex);
  };
  return (
    <div className={'clearfix ' + styles.pagination}>
      <Pagination
        current={index}
        pageSize={size}
        total={tData.length}
        onChange={pageChange} />
    </div>
  );
}

Pager.propTypes = {
  foo: PropTypes.string,
};
export default inject('uiStore')(observer(Pager));
