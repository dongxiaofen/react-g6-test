import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import ComprehenEvalPage from 'components/companyHome/report/ComprehenEval';

@inject('loaningStore')
@observer
export default class ComprehenEval extends Component {
  static propTypes = {
    loaningStore: PropTypes.object,
    routing: PropTypes.object,
  }

  componentDidMount() {
    this.props.loaningStore.getCompanyScore();
  }

  render() {
    return (
      <div>
        <ComprehenEvalPage loaningStore={this.props.loaningStore} />
      </div>
    );
  }
}
