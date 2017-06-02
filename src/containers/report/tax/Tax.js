import React, { Component } from 'react';
import { observer } from 'mobx-react';
import TaxMain from 'components/companyHome/report/tax/TaxMain';

@observer
export default class Tax extends Component {
  render() {
    return (
      <div>
        <TaxMain />
      </div>
    );
  }
}
