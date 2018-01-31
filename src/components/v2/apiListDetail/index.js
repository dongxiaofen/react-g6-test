import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import List from './list';
import Detail from './detail';
import styles from './index.less';

const ListDetail = ({apiListDetailStore}) => {
  const listData = {
    loading: apiListDetailStore.isApiListLoading,
    error: apiListDetailStore.apiList.length === 0 ? {message: '暂无接口列表'} : null
  };
  return (
    <div className={styles.content}>
      <List data={listData}/>
      <Detail />
    </div>
  );
};
ListDetail.propTypes = {
  apiListDetailStore: PropTypes.object,
};
export default inject('apiListDetailStore')(observer(ListDetail));
