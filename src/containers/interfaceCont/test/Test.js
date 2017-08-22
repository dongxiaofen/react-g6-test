import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { batchNav } from 'components/hoc';

@batchNav()
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
