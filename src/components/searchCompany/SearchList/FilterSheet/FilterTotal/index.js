import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function FilterTotal({filterSheet, page, searchKeyFilter, modalStore, getFeedBack}) {
  // total
  let totalNumDom = '';
  let totalText = '找到约';
  if (page.totalElements > 0 && page.totalNum > 0 && page.totalElements === page.totalNum) {
    totalText = '找到';
  }
  if (page.totalNum > 0) {
    totalNumDom = (
      <div className={styles.totalCon}>
        {totalText}
        <span className={styles.findNum}>
          {page.totalNum}
        </span>
        条结果
      </div>
    );
  } else {
    totalNumDom = (
      <div className={styles.totalCon}>
        找到
        <span className={styles.findNum}>
          0
        </span>
        条结果
      </div>
    );
  }
  // search
  let searchKey = '';
  if (page.totalElements > 0 && filterSheet.data.length > 0) {
    searchKey = (
      <div className={styles.searchKeyFilter}>
        <span>{searchKeyFilter}</span>
        搜索
      </div>
    );
  }
  const confirmAction = () => {
    getFeedBack();
    modalStore.closeAction();
  };
  const closeAction = () => {
    modalStore.closeAction();
  };
  // feedBack
  const feedBack = () => {
    const args = {
      title: '添加关键字',
      confirmAction: confirmAction,
      cancelAction: closeAction,
      confirmText: '提交',
      cancelText: '取消',
      isSingleBtn: false,
      confirmLoading: false,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./FeedBack'));
        });
      }
    };
    modalStore.openCompModal({ ...args });
  };
  return (
    <div className={`${styles.wrap}`}>
      {searchKey}
      {totalNumDom}
      <div onClick={feedBack} className={styles.noResult}>
        没有想要的结果？提供关键词
      </div>
    </div>
  );
}

FilterTotal.propTypes = {
  filterSheet: PropTypes.object,
  page: PropTypes.object,
  modalStore: PropTypes.object,
  searchKeyFilter: PropTypes.string,
  getFeedBack: PropTypes.func,
};
export default observer(FilterTotal);
