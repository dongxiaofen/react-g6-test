import React, { Component, PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import {batchReport} from 'components/hoc';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import Checkbox from 'antd/lib/checkbox';

// import loadingComp from 'components/hoc/LoadingComp';
import JudgeDoc from 'components/companyHome/report/riskCourt/JudgeDoc';
import CourtAnnouncement from 'components/companyHome/report/riskCourt/CourtAnnouncement';
import CourtNotice from 'components/companyHome/report/riskCourt/CourtNotice';
import CourtExecution from 'components/companyHome/report/riskCourt/CourtExecution';
import DishonestyList from 'components/companyHome/report/riskCourt/DishonestyList';
import LitigationAssets from 'components/companyHome/report/riskCourt/LitigationAssets';
@inject('routing', 'riskCourtStore', 'uiStore', 'companyHomeStore')
@batchReport('riskCourtStore')
// @loadingComp({
//   mapDataToProps: props => ({
//     loading: !props.riskCourtStore.courtIsBack,
//     error: props.riskCourtStore.courtIsErr,
//     module: '法院公告'
//   })
// })
@observer
export default class RiskCourt extends Component {
  static propTypes = {
    uiStore: PropTypes.object,
    companyHomeStore: PropTypes.object,
    riskCourtStore: PropTypes.object
  };
  regTime = (value)=>{
    return value ? value.slice(0, 10) : '--';
  };

  riskCancel(act) {
    const cancel = this.props.riskCourtStore.cancel;
    if (cancel[act]) {
      cancel[act]();
    }
  }

  filterFinanceData = () => {
    const riskStore = this.props.riskCourtStore;
    const companyHomeStore = this.props.companyHomeStore;
    const uiStore = this.props.uiStore;
    const uiState = uiStore.uiState;
    const courtTabAct = riskStore.courtTabAct;
    const courtCheckGroup = riskStore.courtCheckGroup;
    const uiStateTabAct = uiState[courtTabAct];
    riskStore.updateValue(`courtCheckGroup.${courtTabAct}`, !courtCheckGroup[courtTabAct]);
    const params = {
      basicReportId: companyHomeStore.reportInfo.basicReportId,
      reportId: companyHomeStore.reportInfo.reportId,
      tabAct: riskStore.courtTabAct,
      config: {
        params: {
          index: uiStateTabAct.index,
          size: uiStateTabAct.size,
          finance: courtCheckGroup[courtTabAct]
        }
      }
    };
    this.riskCancel(courtTabAct);
    if (uiStateTabAct.index === 1) {
      riskStore.getRiskCourt(params);
    } else {
      uiStore.updateUiStore(`${courtTabAct}.index`, 1);
    }
  }

  render() {
    const riskCourtStore = this.props.riskCourtStore;
    const courtData = riskCourtStore.courtData;
    const courtLoadingGroup = riskCourtStore.courtLoadingGroup;
    const courtCheckGroup = riskCourtStore.courtCheckGroup;
    const checkBoxStyle = { marginBottom: 20 };
    return (
      <Tabs defaultActiveKey={riskCourtStore.courtTabAct}>
        <TabPane
          tab={`判决文书（${courtData.judgeDoc.totalElements}）`}
          key="judgeDoc">
          <div style={checkBoxStyle}>
            <Checkbox onChange={this.filterFinanceData} checked={courtCheckGroup.judgeDoc}>
              只显示与银行金融机构相关法务信息
            </Checkbox>
          </div>
          <JudgeDoc courtData={courtData.judgeDoc} regTime={this.regTime} loading={courtLoadingGroup.judgeDoc} riskStore={riskCourtStore}/>
        </TabPane>
        <TabPane
          tab={`法院公告（${courtData.courtAnnouncement.totalElements}）`}
          key="courtAnnouncement">
          <div style={checkBoxStyle}>
            <Checkbox onChange={this.filterFinanceData} checked={courtCheckGroup.courtAnnouncement}>
              只显示与银行金融机构相关法务信息
            </Checkbox>
          </div>
          <CourtAnnouncement courtAnnouncement={courtData.courtAnnouncement} regTime={this.regTime} loading={courtLoadingGroup.courtAnnouncement}/>
        </TabPane>
        <TabPane
          tab={`开庭公告（${courtData.courtNotice.totalElements}）`}
          key="courtNotice">
          <div style={checkBoxStyle}>
            <Checkbox onChange={this.filterFinanceData} checked={courtCheckGroup.courtNotice}>
              只显示与银行金融机构相关法务信息
            </Checkbox>
          </div>
          <CourtNotice courtNotice={courtData.courtNotice} regTime={this.regTime} loading={courtLoadingGroup.courtNotice} />
        </TabPane>
        <TabPane
          tab={`被执行人（${courtData.courtExecuted.totalElements}）`}
          key="courtExecuted">
          <CourtExecution courtExecution={courtData.courtExecuted} regTime={this.regTime} loading={courtLoadingGroup.courtExecuted} />
        </TabPane>
        <TabPane
          tab={`失信被执行人（${courtData.courtDishonesty.totalElements}）`}
          key="courtDishonesty">
          <DishonestyList dishonestyList={courtData.courtDishonesty} regTime={this.regTime} loading={courtLoadingGroup.courtDishonesty} />
        </TabPane>
        <TabPane
          tab={`涉诉资产（${courtData.courtLitigation.totalElements}）`}
          key="courtLitigation">
          <LitigationAssets litigationAssets={courtData.courtLitigation} regTime={this.regTime} loading={courtLoadingGroup.courtLitigation} />
        </TabPane>
      </Tabs>
    );
  }
}
