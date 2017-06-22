import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function FeedBack({getFeedBack, modalStore, searchKeyFilter}) {
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
          cb(require('../FilterSheet/FilterTotal/FeedBack'));
        });
      }
    };
    modalStore.openCompModal({ ...args });
  };

  return (
    <div className={searchKeyFilter ? styles.wrap : styles.none}>
      <div onClick={feedBack} className={searchKeyFilter ? styles.noResult : styles.none}>
        没有想要的结果？提供关键词
      </div>
    </div>
  );
}

FeedBack.propTypes = {
  filterSheet: PropTypes.object,
  page: PropTypes.object,
  modalStore: PropTypes.object,
  searchKeyFilter: PropTypes.string,
  getFeedBack: PropTypes.func,
};
export default observer(FeedBack);
