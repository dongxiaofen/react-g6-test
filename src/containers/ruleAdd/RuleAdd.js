import React, { Component } from 'react';
import { observer } from 'mobx-react';
import RuleAddMain from 'components/ruleAdd/RuleAddMain';

@observer
export default class RuleAdd extends Component {
  render() {
    return (
      <div>
        <RuleAddMain />
      </div>
    );
  }
}
