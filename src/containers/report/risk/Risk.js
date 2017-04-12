import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Court from 'components/companyHome/report/risk/Court';
import Tax from 'components/companyHome/report/risk/Tax';
@observer
export default class Corp extends Component {
  render() {
    return (
      <div>
        <Court />
        <Tax />
      </div>
    );
  }
}
