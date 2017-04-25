import React, { Component } from 'react';
import { observer } from 'mobx-react';

import TeamComp from 'components/companyHome/report/Team';

@observer
export default class Team extends Component {
  render() {
    return (
      <TeamComp />
    );
  }
}
