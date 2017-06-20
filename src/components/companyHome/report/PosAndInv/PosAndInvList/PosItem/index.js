import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
// import { ModuleTitle, CardTable } from 'components/common/report';
import styles from './index.less';

function PosItem({modalStore, investmentStore}) {
  const getPosItemInfo = () => {
    investmentStore.changeValue('manageDataInfoIndex', this.props.posItemIndex);
    modalStore.openCompModal({
      width: '920px',
      isCustomize: true,
      boxStyle: {
        padding: '20px',
      },
      pointText: false,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./PosItemInfo'));
        }, 'PosItemInfo');
      },
      closeAction: () => {
        runInAction(() => {
          modalStore.confirmLoading = false;
          modalStore.visible = false;
          modalStore.boxStyle = {};
          modalStore.isCustomize = false;
        });
      }
    });
  };
  const itemData = this.props.posItemData;
  const postion = itemData.positions.join('、');
  const frPositionListCount = itemData.frPositionList.length || 0;
  const managementInvListCount = itemData.managementInvList.length || 0;
  const managementPositionListCount = itemData.managementPositionList.length || 0;
  return (
    <div className={styles.itemBox}>
      <div className={styles.itemBoxTop}>
        <div className={styles.nameTag}>{itemData.name}</div>
        <div className={styles.postion}>{postion}</div>
        <div className={styles.info}><span onClick={getPosItemInfo}>详情</span></div>
      </div>
      <div className={styles.itemBody}>
        <div className={styles.listItem}>对外担任法人代表（{frPositionListCount}家）</div>
        <div className={styles.listItem}>对外投资（{managementInvListCount}家）</div>
        <div className={styles.listItem}>对外任职（{managementPositionListCount}家）</div>
      </div>
    </div>
  );
}

PosItem.propTypes = {
  foo: PropTypes.string,
};
export default inject('modalStore', 'investmentStore')(observer(PosItem));
