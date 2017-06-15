import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function FilterTotal({updateValue, filterSheet, page, searchKeyFilter}) {
  const status = filterSheet.filterSheetStatus;
  // total
  let totalNumDom = '';
  let totalText = '约';
  if (page.totalElements > 0 && page.totalNum > 0 && page.totalElements === page.totalNum) {
    totalText = '';
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
        <span className={styles.findNum}>
          0
        </span>
        条结果
      </div>
    );
  }
  // // search
  // let searchKey = '';
  // if (page.totalElements > 0 && filterSheet.data.length > 0) {
  //   searchKey = (
  //     <div className={styles.searchKeyFilter}>
  //       <span>{searchKeyFilter}</span>
  //       搜索
  //     </div>
  //   );
  // }

  // const confirmAction = () => {
  //   getFeedBack();
  //   modalStore.closeAction();
  // };
  // const closeAction = () => {
  //   modalStore.closeAction();
  // };
  // // feedBack
  // const feedBack = () => {
  //   const args = {
  //     title: '添加关键字',
  //     confirmAction: confirmAction,
  //     cancelAction: closeAction,
  //     confirmText: '提交',
  //     cancelText: '取消',
  //     isSingleBtn: false,
  //     confirmLoading: false,
  //     loader: (cb) => {
  //       require.ensure([], (require) => {
  //         cb(require('./FeedBack'));
  //       });
  //     }
  //   };
  //   modalStore.openCompModal({ ...args });
  // };

  const toggleButton = () => {
    const toggleButtonClass = status ?
      `${styles.toggleButton} ${styles.toggleButtonHidden}` :
      `${styles.toggleButton} ${styles.toggleButtonShow}`;
    const output = (
      <a className={toggleButtonClass}
        onClick={updateValue.bind(this, 'filterSheetStatus', !status)}>{status ? '收起精确筛选' : '查看精确筛选'}<i></i></a>
    );
    return output;
  };

  return (
    <div className={`${styles.wrap}`}>
      {/* searchKey */}
      <div className={styles.searchKeyFilter}>
        为你找到<span className={searchKeyFilter ? styles.text : styles.none}>{searchKeyFilter}</span>
      </div>
      {totalNumDom}
      {toggleButton()}
      {/*
        <div onClick={feedBack} className={searchKeyFilter ? styles.noResult : styles.none}>
          没有想要的结果？提供关键词
        </div>
      */}
    </div>
  );
}

FilterTotal.propTypes = {
  filterSheet: PropTypes.object,
  page: PropTypes.object,
  // modalStore: PropTypes.object,
  searchKeyFilter: PropTypes.string,
  // getFeedBack: PropTypes.func,
};
export default observer(FilterTotal);
