import React, { PropTypes, Component } from 'react';
import { observer, inject } from 'mobx-react';
import GrowingReport from 'GrowingReport';
import OperationReport from 'OperationReport';
import ProfitabilityReport from 'ProfitabilityReport';
// import GrowingReport from 'GrowingReport';
import styles from './index.less';

@inject('onLoanStore')
@observer
export default class LoanReport extends Component {
  render() {
    return (
      <div>
        <div>
          <span>
            <span><image />多维综合分析</span>
            <span><image />盈利能力分析</span>
            <span><image />营运能力分析</span>
            <span><image />成长能力分析</span>
            <span>下载PDF</span>
            <span>`最近刷新时间：${2016 - 5 - 31}`</span>
          </span>
        </div>
        <GrowingReport report={this.props.onLoanStore.growingReport} />
        <OperationReport report={this.props.onLoanStore.operationReport} />
        <ProfitabilityReport report={this.props.onLoanStore.profitabilityReport} />
      </div>
    );
  }
}
LoanReport.propTypes = {
  onLoanStore: PropTypes.object,
};
