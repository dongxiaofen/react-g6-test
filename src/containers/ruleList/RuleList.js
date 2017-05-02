import React, { Component } from 'react';
import { observer } from 'mobx-react';
import RuleListMain from 'components/ruleList/RuleListMain';

@observer
export default class RuleList extends Component {
  render() {
    return (
      <div>
        <RuleListMain />
      </div>
    );
  }
}
