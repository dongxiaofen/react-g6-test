import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Tabs from 'components/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';
import Analysis from 'components/companyHome/report/internet/news/Analysis';
import Content from 'components/companyHome/report/internet/news/Content';
@inject('routing', 'internetStore')
@batchReport('internet')
@observer
export default class Internet extends Component {
  render() {
    return (
      <Tabs>
        <TabPane tab="新闻舆情">
          <Analysis {...this.props} />
          <Content {...this.props} />
        </TabPane>
      </Tabs>
    );
  }
}
