import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import ConsumptionList from 'components/v2/consumption/table';
// import FilterList from 'components/v2/consumption/filterList';
import MainContBox from 'components/common/MainContBox';
import { batchNav } from 'components/hoc';

@batchNav()
@inject('consumptionStore')
@observer
export default class Consumption extends Component {
  static propTypes = {
    consumptionStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.consumptionStore.getConsumptionList();
  }
  render() {
    return (
      <MainContBox>
        {/*<FilterList />*/}
        <ConsumptionList data={{loading: this.props.consumptionStore.consumptionList.content === undefined, error: this.props.consumptionStore.consumptionList.error}}/>
      </MainContBox>
    );
  }
}
