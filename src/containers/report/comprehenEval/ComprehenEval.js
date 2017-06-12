import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import ComprehenEvalPage from 'components/companyHome/loaning/ComprehenEval';

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

  componentWillUnmount() {
    this.props.loaningStore.resetSixStarStore();
  }

  render() {
    return (
      <div>
        <ComprehenEvalPage loaningStore={this.props.loaningStore} />
      </div>
    );
  }
}
