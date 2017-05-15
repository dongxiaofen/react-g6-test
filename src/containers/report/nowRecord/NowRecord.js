import React, { Component } from 'react';
import { observer } from 'mobx-react';
import NowRecordMain from 'components/companyHome/NowRecord';

@observer
export default class NowRecord extends Component {
  render() {
    return (
      <div>
        <NowRecordMain />
      </div>
    );
  }
}
