import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import TaxCheckMain from 'components/taxCheckMain';
import { batchReport } from 'components/hoc';

@inject('routing', 'taxCheckStore')
@batchReport('taxCheckStore')
@observer

export default class TaxCheck extends Component {
  static propTypes = {
    // routing: PropTypes.object,
    taxCheckStore: PropTypes.object,
  }
  componentWillUnmount() {
    this.props.taxCheckStore.resetStore();
  }
  render() {
    return (
      <div>
        <TaxCheckMain />
      </div>
    );
  }
}
