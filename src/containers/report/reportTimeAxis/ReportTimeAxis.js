import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import TimeAxisComp from 'components/companyHome/report/timeAxis';
import AlertAnalysisBody from 'components/companyHome/report/AlertAnalysis';
import RiskFeaturesExplain from 'components/companyHome/report/riskFeatures/RiskFeaturesExplain';
import RiskFeaturesScan from 'components/companyHome/report/riskFeatures/RiskFeaturesScan';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';

@inject('routing', 'reportAxisStore', 'bannerStore')
@batchReport('reportAxisStore')
@observer
export default class ReportTimeAxis extends Component {
  static propTypes ={
    reportAxisStore: PropTypes.object,
  };
  componentWillUnmount() {
    this.props.reportAxisStore.cancelAlertDetail();
  }
  render() {
    const store = this.props.reportAxisStore;
    return (
      <Tabs defaultActiveKey="事件规则预警">
        <TabPane tab="事件规则预警" key="事件规则预警">
          <AlertAnalysisBody dataStore={this.props.reportAxisStore}/>
        </TabPane>
        <TabPane tab="历史事件趋势" key="历史事件趋势">
          <TimeAxisComp {...this.props} title="历史时间轴" timeAxisStore={store} />
        </TabPane>
        <TabPane tab="风险特征扫描" key="风险特征扫描">
          <RiskFeaturesScan />
        </TabPane>
        <TabPane tab="风险特征说明" key="风险特征说明">
          <RiskFeaturesExplain />
        </TabPane>
      </Tabs>
    );
  }
}
