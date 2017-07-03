import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DebtPayAbilityEvalBody from 'components/companyHome/report/DebtPayAbilityEval';

@observer
export default class DebtPayAbilityEval extends Component {
  render() {
    return (
      <div>
        <DebtPayAbilityEvalBody />
      </div>
    );
  }
}
