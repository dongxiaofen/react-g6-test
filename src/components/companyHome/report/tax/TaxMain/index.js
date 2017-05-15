import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import TaxProfit from '../TaxProfit';
import TaxOperation from '../TaxOperation';
import TaxUp from '../TaxUp';
@inject('routing', 'taxStore')
@observer
export default class TaxMain extends Component {
  static propTypes = {
    routing: PropTypes.object,
    taxStore: PropTypes.object,
  }

  componentDidMount() {
    const { monitorId } = this.props.routing.location.query;
    this.props.taxStore.getTaxList(monitorId);
  }
  componentWillUnmount() {
    this.props.taxStore.resetStore();
  }
  render() {
    return (
      <div className={styles.box}>
        <TaxProfit taxStore={this.props.taxStore} />
        <TaxOperation taxStore={this.props.taxStore} />
        <TaxUp taxStore={this.props.taxStore} />
      </div>
    );
  }
}
