import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SolutionPage from 'components/solution';

@observer
export default class Solution extends Component {
  render() {
    return (
      <SolutionPage />
    );
  }
}
