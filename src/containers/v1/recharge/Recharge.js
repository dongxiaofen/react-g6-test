import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import RechargeList from 'components/v1/recharge/table';
import DateFilter from 'components/v1/recharge/dateFilter';
// import DateFilter from 'components/consume/recharge/dateFilter';
import MainContBox from 'components/common/MainContBox';
import { batchNav } from 'components/hoc';

@batchNav()
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
      <MainContBox>
        <DateFilter />
        <RechargeList data={{loading: this.props.consumeStore.recharge.rechargeList.content === undefined, error: this.props.consumeStore.recharge.rechargeList.error}}/>
      </MainContBox>
    );
  }
}
