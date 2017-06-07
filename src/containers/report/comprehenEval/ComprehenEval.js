import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ComprehenEvalPage from 'components/companyHome/loaning/ComprehenEval';
@observer
export default class ComprehenEval extends Component {
  render() {
    return (
      <div>
        <ComprehenEvalPage />
      </div>
    );
  }
}
