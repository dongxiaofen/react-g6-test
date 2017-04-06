import React, { Component, PropTypes } from 'react';
import BaseInfo from './BaseInfo';

export default class MyHomePageBody extends Component {
  static propTypes = {
    foo: PropTypes.string
  };
  render() {
    return (
      <div>
        <BaseInfo />
      </div>
    );
  }
}
