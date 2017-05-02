import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PersonReportBody from 'components/personReport';

@observer
export default class PersonReport extends Component {

  render() {
    return (
      <PersonReportBody />
    );
  }
}
