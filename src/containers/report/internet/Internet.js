import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';
import Analysis from 'components/companyHome/report/internet/news/Analysis';
import Content from 'components/companyHome/report/internet/news/Content';
@inject('routing', 'internetStore')
@batchReport('internetStore')
@observer
export default class Internet extends Component {
  render() {
    return (
      <div>
        <Analysis {...this.props} />
        <Content {...this.props} />
      </div>
    );
  }
}
