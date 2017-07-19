import React, { Component, PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import { batchReport } from 'components/hoc';
import ShareHolder from 'components/companyHome/report/investment/ShareHolder';

@inject('routing', 'investmentStore')
@batchReport('investmentStore')
@observer
export default class SharePosAndInv extends Component {
  static propTypes = {
    investmentStore: PropTypes.object,
  }
  render() {
    return (
      <ShareHolder investmentStore = {this.props.investmentStore} />
    );
  }
}
