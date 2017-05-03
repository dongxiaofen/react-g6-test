import React, { Component } from 'react';
import { observer } from 'mobx-react';
import RuleCompanyMain from 'components/ruleCompany/RuleCompanyMain';

@observer
export default class RuleCompany extends Component {
  render() {
    return (
      <div>
        <RuleCompanyMain />
      </div>
    );
  }
}
