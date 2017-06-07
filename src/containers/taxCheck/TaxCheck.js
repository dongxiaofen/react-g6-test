import React, { Component } from 'react';
import { observer } from 'mobx-react';
import TaxCheckMain from 'components/taxCheckMain';

@observer
export default class TaxCheck extends Component {
  render() {
    return (
      <div>
        <TaxCheckMain />
      </div>
    );
  }
}
