import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import RechargeList from 'components/v1/recharge/table';
// import DateFilter from 'components/v1/recharge/dateFilter';
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
  render() {
    console.log(this.props.rechargeStore.rechargeList.content, 'content-------------');
    return (
      <MainContBox>
        {/*<DateFilter />*/}
        <RechargeList data={{loading: this.props.rechargeStore.rechargeList.content === undefined, error: this.props.rechargeStore.rechargeList.error}}/>
      </MainContBox>
    );
  }
}
