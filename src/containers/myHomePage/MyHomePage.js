import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MyHomePageBody from 'components/myHomePage';

@observer
export default class MyHomePage extends Component {
  render() {
    return (
      <MyHomePageBody />
    );
  }
}
