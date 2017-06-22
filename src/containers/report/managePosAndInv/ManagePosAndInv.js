import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';

import PosAndInvMain from 'components/companyHome/report/PosAndInv';

@inject('investmentStore')
@batchReport('investmentStore')
@observer
export default class ManagePosAndInv extends Component {
  static propTypes = {
    investmentStore: PropTypes.object,
  };
  render() {
    return (
      <PosAndInvMain/>
    );
  }
}
