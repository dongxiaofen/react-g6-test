import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export default class Safe extends Component {
  render() {
    return (
      <div>
        Safe
      </div>
    );
  }
}
