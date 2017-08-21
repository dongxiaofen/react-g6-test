import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import RechargeList from 'components/consume/recharge/table';

@inject('consumeStore')
@observer
export default class Recharge extends Component {
  static propTypes = {
    consumeStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.consumeStore.getRechargeList();
  }
  render() {
    return (
      <div>
        <RechargeList data={{loading: this.props.consumeStore.recharge.rechargeList.content === undefined, error: this.props.consumeStore.recharge.rechargeList.error}}/>
      </div>
    );
  }
}
