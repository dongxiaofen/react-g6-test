import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { batchNav } from 'components/hoc';

@batchNav()
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
