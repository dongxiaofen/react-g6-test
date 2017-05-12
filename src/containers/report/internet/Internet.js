import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Tabs from 'antd/lib/tabs';
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
        <TabPane key="1" tab="新闻舆情">
          <Analysis {...this.props} />
          <Content {...this.props} />
        </TabPane>
      </Tabs>
    );
  }
}
