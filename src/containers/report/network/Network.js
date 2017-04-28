import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';

@inject('routing', 'networkStore')
@batchReport('network')
@observer
export default class Network extends Component {
  render() {
    return (
      <div>
        currentNetwork
      </div>
    );
  }
}
