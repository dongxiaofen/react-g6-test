import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import TaxCheckItem from './TaxCheckItem';
import Button from 'components/lib/button';

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
    const { monitorId, reportId } = this.props.routing.location.query;
    this.props.taxCheckStore.getTaxCheckList(monitorId, reportId);
  }
  componentWillUnmount() {
    this.props.taxCheckStore.resetStore();
  }
  render() {
    const taxListData = this.props.taxCheckStore.taxListData.content;
    let listDom = '';
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
