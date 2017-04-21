import React, { Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import Court from 'components/companyHome/report/risk/Court';
import Tax from 'components/companyHome/report/risk/Tax';
import {batchReport} from 'components/hoc';
import Tabs from 'components/lib/tabs';
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
      <Tabs>
        <TabPane tab="法务信息">
          <Court riskStore={riskStore}/>
        </TabPane>
        <TabPane tab="税务公示信息">
          <Tax />
        </TabPane>
        <TabPane tab="工商公示信息">
          <Tax />
        </TabPane>
      </Tabs>
    );
  }
}
