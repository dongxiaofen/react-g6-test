import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class Test extends Component {
  render() {
    return (
      <div>
        test
      </div>
    );
  }
}