import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AccoutProfileBody from 'components/accountProfilePage';

@observer
export default class AccountProfile extends Component {
  render() {
    return (
      <div>
        <AccoutProfileBody />
      </div>
    );
  }
}
