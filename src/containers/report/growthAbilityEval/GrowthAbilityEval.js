import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import GrowingReport from 'components/companyHome/report/GrowingReport/index';
@inject('loaningStore')
@observer
export default class GrowthAbilityEval extends Component {
  static propTypes = {
    loaningStore: PropTypes.object,
    routing: PropTypes.object,
  }

  componentDidMount() {
    this.props.loaningStore.getUpDataList();
  }

  componentWillUnmount() {
    // this.props.loaningStore.resetgetUpDataListStore();
  }

  render() {
    return (
      <div>
        <GrowingReport loaningStore={this.props.loaningStore} />
      </div>
    );
  }
}
