import React, { Component } from 'react';
import { observer } from 'mobx-react';
import TaxCheckMain from 'components/companyHome/infoCheck/TaxCheckMain';

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
