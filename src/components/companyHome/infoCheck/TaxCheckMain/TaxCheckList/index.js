import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import TaxCheckItem from './TaxCheckItem';
import Button from 'components/lib/button';
import noData from 'imgs/tax/bd.png';
@inject('routing', 'taxCheckStore', 'uiStore', 'modalStore')
@observer
export default class TaxCheckList extends Component {
  static propTypes = {
    routing: PropTypes.object,
    taxCheckStore: PropTypes.object,
    uiStore: PropTypes.object,
    modalStore: PropTypes.object,
  }
  componentDidMount() {
    const { monitorId } = this.props.routing.location.query;
    this.props.taxCheckStore.getMonitorId(monitorId);
  }
  componentWillUnmount() {
    this.props.taxCheckStore.resetStore();
  }
  handleClick = () => {
    this.props.modalStore.openCompModal({
      title: '税务核查',
      width: '695px',
      isSingleBtn: true,
      confirmText: '核查',
      confirmWidth: 280,
      pointText: '核查即视为同意',
      pactUrl: '',
      pactName: '用户服务协议',
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('../TaxCheckModal'));
        }, 'TaxCheckModal');
      },
    });
  }
  render() {
    const taxListData = this.props.taxCheckStore.taxListData;
    let listDom = (
      <div className={styles.noData}>
        <img className={styles.img} src={noData} />
        <div className={styles.noDataInfo}>
          还没有税务核查结果，请添加核查
        </div>
        <Button className={styles.noDataButton} onClick={this.handleClick.bind(this)}>添加核查</Button>
      </div>
    );
    if (taxListData && taxListData.length > 0) {
      listDom = (
        <div className={styles.wrap}>
          <div className={styles.top}>
            <Button className={styles.noDataButton} onClick={this.handleClick.bind(this)}>添加核查</Button>
            <span className={styles.text}>
              核查结果提示：<span>税务核查金额和实际金额误差在5%以内时即“匹配”，超过5%即“不匹配”</span>
            </span>
          </div>
          <TaxCheckItem
            taxCheckStore={this.props.taxCheckStore}
            uiStore={this.props.uiStore} />
        </div>
      );
    }
    return (
      <div className={styles.box}>
        {listDom}
      </div>
    );
  }
}
