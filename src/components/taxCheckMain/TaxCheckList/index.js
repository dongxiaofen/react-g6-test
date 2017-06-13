import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import styles from './index.less';
// import TaxCheckItem from './TaxCheckItem';
import Button from 'components/lib/button';

@inject('taxCheckStore', 'uiStore', 'modalStore')
@observer
export default class TaxCheckList extends Component {
  static propTypes = {
    // routing: PropTypes.object,
    showAddTaxCheck: PropTypes.func,
    taxCheckStore: PropTypes.object,
    uiStore: PropTypes.object,
    modalStore: PropTypes.object,
  }
  componentDidMount() {
    // const { monitorId, reportId } = this.props.routing.location.query;
    this.props.taxCheckStore.getTaxCheckList();
  }
  componentWillUnmount() {
    this.props.taxCheckStore.resetStore();
  }
  getTaxCheckInfo = (companyId, companyName) => {
    this.props.taxCheckStore.getTaxCheckInfo(companyId, companyName);
    this.props.modalStore.openCompModal({
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
      // confirmAction: () => {
      //   console.log('confirmAction===');
      // },
      closeAction: () => {
        runInAction(() => {
          this.props.modalStore.confirmLoading = false;
          this.props.modalStore.visible = false;
          this.props.modalStore.boxStyle = {};
          this.props.modalStore.isCustomize = false;
        });
      }
    });
  };
  handleClick = (companyName) => {
    this.props.showAddTaxCheck();
    this.props.taxCheckStore.changeValue('companyName', companyName);
  };
  render() {
    const taxListData = this.props.taxCheckStore.taxListData.content;
    const listDom = [];
    if (taxListData && taxListData.length > 0) {
      taxListData.forEach((item, idx) => {
        listDom.push(
          <div className={styles.wrap} key={`taxListData${idx}`}>
            <div className={styles.top}>
              <Button className={styles.noDataButton} onClick={this.handleClick.bind(this, item.companyName)}>继续核查</Button>
            </div>
            <div className={styles.companyName}><a onClick={this.getTaxCheckInfo.bind(this, item.companyId, item.companyName)}>{item.companyName}</a></div>
            <div className={styles.checkTime}>最后核查日期：{item.checkTime}</div>
          </div>
        );
        return listDom;
      });
    }
    return (
      <div className={styles.box}>
        {listDom}
      </div>
    );
  }
}
