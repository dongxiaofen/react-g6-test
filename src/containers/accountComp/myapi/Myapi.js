import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MyapiMain from 'components/account/myapi';

@observer
export default class MyApi extends Component {
  render() {
    return (
      <div>
        <MyapiMain />
      </div>
    );
  }
}
