import React, { Component, PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import {batchReport} from 'components/hoc';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import AbnormalOperation from 'components/companyHome/report/risk/mici/AbnormalOperation';
import CheckMessage from 'components/companyHome/report/risk/mici/CheckMessage';

@inject('routing', 'riskStore')
@batchReport('risk')
@observer
export default class RiskMici extends Component {
  static propTypes = {
    riskStore: PropTypes.object
  };
  render() {
    const isLoading = this.props.riskStore.isLoading;
    const corpDetailPunish = this.props.riskStore.corpDetailPunish;
    return (
      <Tabs defaultActiveKey="抽查检查">
        <TabPane tab="抽查检查" key="抽查检查">
          <CheckMessage checkMessage={corpDetailPunish.checkMessage} isLoading={isLoading}/>
        </TabPane>
        <TabPane tab="经营异常" key="经营异常">
          <AbnormalOperation abnormalOperation={corpDetailPunish.abnormalOperation} isLoading={isLoading}/>
        </TabPane>
        <TabPane tab="违法记录" key="违法记录">
          违法记录
        </TabPane>
      </Tabs>
    );
  }
}
