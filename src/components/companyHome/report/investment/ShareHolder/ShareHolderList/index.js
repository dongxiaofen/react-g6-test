import React from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { loadingComp } from 'components/hoc';

function ShareHolderList({shareholders, investmentStore, modalStore}) {
  const output = [];
  const getDetailInfo = (idx)=> {
    investmentStore.changeValue('shareholdInfoIdx', idx);
    modalStore.openCompModal({
      width: '920px',
      isCustomize: true,
      boxStyle: {
        padding: '20px',
      },
      pointText: false,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./ShareHolderInfo'));
        }, 'ShareHolderInfo');
      }
    });
  };
  if (shareholders.length > 0 ) {
    shareholders.forEach((item, idx) => {
      const {shareHolderPositionFrList, shareHolderInvList, shareHolderPositionList, shareHolder} = item;
      const {subConam, fundedRatio} = shareHolder;
      const invesStr = shareHolder && subConam ? `投资金额 ${Number(subConam).toFixed(2)}万元（${fundedRatio}）` : '--';
      output.push(
        <div className={styles.itemBox} key={`shareholder${idx}`}>
          <div className={styles.itemBoxTop}>
            <div className={styles.nameTag}>{item.name}</div>
            <div className={styles.postion}>{invesStr}</div>
            <div className={styles.info}><span onClick={getDetailInfo.bind(null, idx)}>详情</span></div>
          </div>
          <div className={styles.itemBody}>
            <div className={styles.listItem}>担任法人的企业（{shareHolderPositionFrList.length}家）</div>
            <div className={styles.listItem}>投资企业（{shareHolderInvList.length}家）</div>
            <div className={styles.listItem}>任职企业（{shareHolderPositionList.length}家）</div>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      {output}
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    module: props.module
  })
})(inject('investmentStore', 'modalStore')(observer(ShareHolderList)));
