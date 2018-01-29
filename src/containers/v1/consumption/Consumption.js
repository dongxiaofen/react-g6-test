import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import ConsumptionList from 'components/v1/consumption/table';
import FilterList from 'components/v1/consumption/filterList';
import MainContBox from 'components/common/MainContBox';
import { batchNav } from 'components/hoc';

@batchNav()
@inject('consumeStore')
@observer
export default class Consumption extends Component {
  static propTypes = {
    consumeStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.consumeStore.getConsumptionList();
    this.props.consumeStore.getInterfaceType();
  }
  render() {
    return (
      <MainContBox>
        <FilterList />
        <ConsumptionList data={{loading: this.props.consumeStore.consumption.consumptionList.content === undefined, error: this.props.consumeStore.consumption.consumptionList.error}}/>
      </MainContBox>
    );
  }
}
