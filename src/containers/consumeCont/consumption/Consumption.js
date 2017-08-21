import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import ConsumptionList from 'components/consume/consumption/table';
import FilterList from 'components/consume/consumption/filterList';

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
      <div>
        <FilterList />
        <ConsumptionList data={{loading: this.props.consumeStore.consumption.consumptionList.content === undefined, error: this.props.consumeStore.consumption.consumptionList.error}}/>
      </div>
    );
  }
}
