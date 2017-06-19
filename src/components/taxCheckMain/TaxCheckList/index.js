import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import styles from './index.less';
// import TaxCheckItem from './TaxCheckItem';
import Pager from 'components/common/Pager';
import ErrorText from 'components/common/ErrorText';
import Button from 'components/lib/button';
import { loadingComp } from 'components/hoc';
import NoData from './NoData';

function TaxCheckList({taxCheckStore, modalStore}) {
  const getTaxCheckInfo = (companyId, companyName) => {
    taxCheckStore.getTaxCheckInfo(companyId, companyName);
    modalStore.openCompModal({
      // title: '企业税务核查',
      width: '920px',
      isCustomize: true,
      // isSingleBtn: true,
      // confirmText: '确定',
      // confirmWidth: 280,
      boxStyle: {
        padding: '20px',
      },
      pointText: false,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./TaxCheckItem'));
        }, 'TaxCheckItem');
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
  const handleClick = (companyName) => {
    this.props.showAddTaxCheck();
    this.props.taxCheckStore.changeValue('companyName', companyName);
    this.props.taxCheckStore.changeValue('isLockCompanyName', true);
  };

  const taxListData = this.props.taxCheckStore.taxListData;
  const listDom = [];
  if (taxListData && taxListData.length > 0) {
    taxListData.forEach((item, idx) => {
      listDom.push(
        <div className={styles.wrap} key={`taxListData${idx}`}>
          <div className={styles.top}>
            <Button className={styles.noDataButton} onClick={handleClick.bind(this, item.companyName)}>继续核查</Button>
          </div>
          <div className={styles.companyName}><a onClick={getTaxCheckInfo.bind(this, item.companyId, item.companyName)}>{item.companyName}</a></div>
          <div className={styles.checkTime}>最后核查日期：{item.checkTime}</div>
        </div>
      );
    });
  } else {
    listDom.push(<ErrorText error={{message: '尚未进行企业年度报税核查，请添加'}} key="ErrorText"/>);
  }
  return (
    <div className={styles.box}>
      {taxListData.length > 0 ? listDom : <NoData/>}
      <Pager tData={taxListData} module="taxCheckPager" type="large" />
    </div>
  );
}

TaxCheckList.propTypes = {
  showAddTaxCheck: PropTypes.func,
  taxCheckStore: PropTypes.object,
  modalStore: PropTypes.object,
};

export default loadingComp(
  {mapDataToProps: props=> ({
    loading: props.loading,
    imgCategory: 14,
    category: 2,
    errCategory: 2,
    module: '企业年度报税',
    error: false,
  })}
)(inject('taxCheckStore', 'modalStore')(observer(TaxCheckList)));
