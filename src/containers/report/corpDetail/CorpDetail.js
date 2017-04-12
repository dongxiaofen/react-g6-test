import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Info from 'components/companyHome/report/corpDetail/Info';
import Foreign from 'components/companyHome/report/corpDetail/Foreign';
@observer
export default class Corp extends Component {
  render() {
    return (
      <div>
        <Info />
        <Foreign />
      </div>
    );
  }
}
