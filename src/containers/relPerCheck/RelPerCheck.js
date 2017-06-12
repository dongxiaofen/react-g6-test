import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import RelPerInfo from 'components/relPerCheck';
import { batchReport } from 'components/hoc';

@inject('routing', 'relPerCheckStore')
@batchReport('relPerCheck')
@observer

export default class RelPerCheck extends Component {
  static propTypes = {
    routing: PropTypes.object,
    relPerCheckStore: PropTypes.object,
  }
  componentWillUnmount() {
    this.props.relPerCheckStore.resetStore();
  }
  render() {
    return (
      <RelPerInfo />
    );
  }
}
