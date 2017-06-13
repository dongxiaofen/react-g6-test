import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import OperationReport from 'components/companyHome/report/OperationReport';

@inject('loaningStore')
@observer
export default class OperationEval extends Component {
  static propTypes = {
    loaningStore: PropTypes.object,
    routing: PropTypes.object,
  }

  componentDidMount() {
    this.props.loaningStore.getOperationDataList();
  }

  componentWillUnmount() {
    this.props.loaningStore.resetOperationDataList();
  }

  render() {
    return (
      <div>
        <OperationReport operationDataList={this.props.loaningStore.operationDataList} />
      </div>
    );
  }
}
