import React, { Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import Court from 'components/companyHome/report/risk/Court';
import Tax from 'components/companyHome/report/risk/Tax';
import Mici from 'components/companyHome/report/risk/Mici';
import {batchReport} from 'components/hoc';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;

@inject('routing', 'riskStore')
@batchReport('risk')
@observer
export default class Risk extends Component {
  static propTypes = {
    riskStore: PropTypes.object
  };
  render() {
    const riskStore = this.props.riskStore;
    return (
      <Tabs defaultActiveKey="法务信息">
        <TabPane tab="法务信息" key="法务信息">
          <Court riskStore={riskStore}/>
        </TabPane>
        <TabPane tab="税务公示信息" key="税务公示信息">
          <Tax riskStore={riskStore}/>
        </TabPane>
        <TabPane tab="工商公示信息" key="工商公示信息">
          <Mici riskStore={riskStore}/>
        </TabPane>
      </Tabs>
    );
  }
}
