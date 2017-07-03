import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
// import { toJS } from 'mobx';
import styles from './index.less';
import DetailItem from './DetailItem';

function DetailList({blackNetworkStore, detailModalStore}) {
  const {blackList, focusIdx, expandIdx, modalFocusIdx} = blackNetworkStore;
  const toggleFocusName = (idx)=>{
    blackNetworkStore.toggleFocusName(idx);
  };
  const toggleExpand = (idx) => {
    blackNetworkStore.toggleExpand(idx);
  };
  const showDetail = (index, item)=>{
    console.log(index, item);
    blackNetworkStore.openDetailModal(index, item);
    detailModalStore.openDetailModal(
      (cb) => {
        require.ensure([], (require) => {
          cb(
            require('./DetailTitle'),
            require('./DetailModal')
          );
        });
      },
      '失信被执行人记录'
    );
  };
  return (
    <div className={styles.box}>
      <div className={styles.tip}>
        <i className="fa fa-info-circle"></i>
        &nbsp;展开高风险企业,查看风险详情
        </div>
      <div className={styles.list}>
        {
          blackList.map((item, idx) =>
            <DetailItem
              key={item.blackListNode + idx}
              item={item}
              toggleFocusName={toggleFocusName}
              toggleExpand={toggleExpand}
              showDetail={showDetail}
              isFocus={focusIdx === idx}
              isExpend={expandIdx === idx}
              modalFocusIdx={modalFocusIdx}
              idx={idx} />
          )
        }
      </div>
    </div>
  );
}

DetailList.propTypes = {
  foo: PropTypes.string,
};
export default inject('blackNetworkStore', 'detailModalStore')(observer(DetailList));
