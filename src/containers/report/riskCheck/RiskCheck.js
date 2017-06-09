import React, { Component } from 'react';
import { observer, inject} from 'mobx-react';
import {batchReport} from 'components/hoc';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import AbnormalOperation from 'components/companyHome/report/riskCheck/AbnormalOperation';
import CheckMessage from 'components/companyHome/report/riskCheck/CheckMessage';

@inject('routing', 'riskCheckStore')
@batchReport('riskCheckStore')
@observer
export default class RiskCheck extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="抽查检查">
        <TabPane tab="抽查检查" key="抽查检查">
          <CheckMessage {...this.props} />
        </TabPane>
        <TabPane tab="经营异常" key="经营异常">
          <AbnormalOperation {...this.props} />
        </TabPane>
        <TabPane tab="违法记录" key="违法记录">
          违法记录
        </TabPane>
      </Tabs>
    );
  }
}
