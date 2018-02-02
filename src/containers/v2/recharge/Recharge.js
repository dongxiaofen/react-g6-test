import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import RechargeList from 'components/v2/recharge/table';
import DateFilter from 'components/v2/recharge/dateFilter';
// import DateFilter from 'components/consume/recharge/dateFilter';
import MainContBox from 'components/common/MainContBox';
import { batchNav } from 'components/hoc';

@batchNav()
@inject('rechargeStore')
@observer
export default class Recharge extends Component {
  static propTypes = {
    rechargeStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.rechargeStore.getRechargeList();
  }
  componentWillUnmount() {
    this.props.rechargeStore.resetData();
  }
  render() {
    return (
      <MainContBox>
        <DateFilter />
        <RechargeList data={{loading: this.props.rechargeStore.rechargeList.content === undefined, error: this.props.rechargeStore.rechargeList.error}}/>
      </MainContBox>
    );
  }
}
