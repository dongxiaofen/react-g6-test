import React, { Component } from 'react';
import { observer } from 'mobx-react';
import HomeBody from 'components/HomePage';

@observer
export default class HomePage extends Component {
  render() {
    return (
        <HomeBody />
    );
  }
}
