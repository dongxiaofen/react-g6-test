import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';
import BlackNetwork from 'components/companyHome/report/blackNetwork/BlackNetwork';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
@inject('routing', 'blackNetworkStore')
@batchReport('blackNetworkStore')
@observer
export default class RiskConduct extends Component {
  static propTypes = {
    blackNetworkStore: PropTypes.object
  };
  render() {
    const {isLoading, error} = this.props.blackNetworkStore;
    return (
      <Tabs defaultActiveKey="风险链条">
        <TabPane tab="风险链条" key="风险链条">
          <BlackNetwork {...{isLoading, error}} />
        </TabPane>
        <TabPane tab="风险量化" key="风险量化" disabled />
      </Tabs>
    );
  }
}
