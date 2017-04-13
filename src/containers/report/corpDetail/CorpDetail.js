import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Info from 'components/companyHome/report/corpDetail/Info';
import Foreign from 'components/companyHome/report/corpDetail/Foreign';
import {batchReport} from 'components/hoc';

@inject('routing', 'corpDetailStore')
@batchReport('corpDetail')
@observer
export default class CorpDetail extends Component {

  render() {
    return (
      <div>
        <Info />
        <Foreign />
      </div>
    );
  }
}
