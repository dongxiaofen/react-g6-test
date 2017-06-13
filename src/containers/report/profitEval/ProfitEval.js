import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import ProfitabilityReport from 'components/companyHome/report/ProfitabilityReport';

@inject('loaningStore')
@observer
export default class ProfitEval extends Component {
  static propTypes = {
    loaningStore: PropTypes.object,
    routing: PropTypes.object,
  }

  componentDidMount() {
    this.props.loaningStore.getProfitEvalList();
  }

  componentWillUnmount() {
    // this.props.loaningStore.resetProfitEvalStore();
  }

  render() {
    return (
      <div>
        <ProfitabilityReport profitDataList={this.props.loaningStore.profitDataList} />
      </div>
    );
  }
}
