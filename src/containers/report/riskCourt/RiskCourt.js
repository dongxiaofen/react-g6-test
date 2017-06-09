import React, { Component, PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import {batchReport} from 'components/hoc';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import loadingComp from 'components/hoc/LoadingComp';
import JudgeDoc from 'components/companyHome/report/riskCourt/JudgeDoc';
import CourtAnnouncement from 'components/companyHome/report/riskCourt/CourtAnnouncement';
import CourtNotice from 'components/companyHome/report/riskCourt/CourtNotice';
import CourtExecution from 'components/companyHome/report/riskCourt/CourtExecution';
import DishonestyList from 'components/companyHome/report/riskCourt/DishonestyList';
import LitigationAssets from 'components/companyHome/report/riskCourt/LitigationAssets';
@inject('routing', 'riskCourtStore')
@batchReport('riskCourtStore')
@loadingComp({
  mapDataToProps: props => ({
    loading: props.riskCourtStore.isLoading,
    error: !props.riskCourtStore.court.hasCourtData,
    module: '法院公告'
  })
})
@observer
export default class RiskCourt extends Component {
  static propTypes = {
    riskCourtStore: PropTypes.object
  };
  regTime = (value)=>{
    return value ? value.slice(0, 10) : '--';
  };
  render() {
    const riskCourtStore = this.props.riskCourtStore;
    const court = riskCourtStore.court;
    const courtData = riskCourtStore.court.courtData;
    const countCount = courtData.countCount;
    return (
      <Tabs defaultActiveKey={court.tabAct}>
        <TabPane
          tab={`判决文书（${countCount['判决文书']}）`}
          key="判决文书"
          disabled={countCount['判决文书'] > 0 ? false : true}>
          <JudgeDoc courtData={courtData.judgeDoc.data} regTime={this.regTime} riskStore={riskCourtStore}/>
        </TabPane>
        <TabPane
          tab={`法院公告（${countCount['法院公告']}）`}
          key="法院公告"
          disabled={countCount['法院公告'] > 0 ? false : true}>
          <CourtAnnouncement courtAnnouncement={courtData.courtAnnouncement} regTime={this.regTime}/>
        </TabPane>
        <TabPane
          tab={`开庭公告（${countCount['开庭公告']}）`}
          key="开庭公告"
          disabled={countCount['开庭公告'] > 0 ? false : true}>
          <CourtNotice courtNotice={courtData.courtNotice} regTime={this.regTime} />
        </TabPane>
        <TabPane
          tab={`被执行人信息（${countCount['被执行人信息']}）`}
          key="被执行人信息"
          disabled={countCount['被执行人信息'] > 0 ? false : true}>
          <CourtExecution courtExecution={courtData.courtExecution} regTime={this.regTime} />
        </TabPane>
        <TabPane
          tab={`失信被执行人信息（${countCount['失信被执行人信息']}）`}
          key="失信被执行人信息"
          disabled={countCount['失信被执行人信息'] > 0 ? false : true}>
          <DishonestyList dishonestyList={courtData.dishonestyList} regTime={this.regTime} />
        </TabPane>
        <TabPane
          tab={`涉诉资产（${countCount['涉诉资产']}）`}
          key="涉诉资产"
          disabled={countCount['涉诉资产'] > 0 ? false : true}>
          <LitigationAssets litigationAssets={courtData.litigationAssets} regTime={this.regTime} />
        </TabPane>
      </Tabs>
    );
  }
}
