import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import RelPerInfo from 'components/relPerCheck';
import { batchReport } from 'components/hoc';

@inject('routing', 'relPerCheckStore')
@batchReport('relPerCheck')
@observer
export default class RelPerCheck extends Component {
  render() {
    return (
      <RelPerInfo />
    );
  }
}
