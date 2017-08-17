import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ModifyMain from 'components/account/modify';

@observer
export default class Modify extends Component {
  render() {
    return (
      <div>
        <ModifyMain />
      </div>
    );
  }
}
