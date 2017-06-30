import React, { Component } from 'react';
import { observer } from 'mobx-react';
import BlackListBody from 'components/companyHome/report/BlackList';

@observer
export default class BlackList extends Component {
  render() {
    return (
      <div>
        <BlackListBody />
      </div>
    );
  }
}
