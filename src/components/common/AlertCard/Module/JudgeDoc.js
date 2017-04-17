import React, {Component, PropTypes} from 'react';
import BaseModule from '../BaseModule';
// import Loading from 'components/common/Loading';
export default class JudgeDoc extends Component {
  static propTypes = {
    module: PropTypes.string,
    data: PropTypes.object,
    riskHeadlines: PropTypes.object,
    laneGraph: PropTypes.object,
    riskheadlinesBoundAC: PropTypes.object,
    laneGraphBoundAC: PropTypes.object,
    commonBoundAC: PropTypes.object,
    reducerAction: PropTypes.object,
    reducerData: PropTypes.object,
  };
  regTime(value) {
    let time;
    if (value) {
      time = value.slice(0, 10);
    } else {
      time = value;
    }
    return time;
  }
  matchActionByModule() {
    const module = this.props.module;
    switch (module) {
      case 'laneGraph':
        return this.props.laneGraphBoundAC;
      default:
        return this.props.reducerAction;
    }
  }
  matchReducerByModule() {
    const module = this.props.module;
    switch (module) {
      case 'laneGraph':
        return this.props.laneGraph;
      default:
        return this.props.reducerData;
    }
  }
  modifyLitiganti(data) {
    if (data) {
      const newsData = data.toJS().map((item)=>{
        const result = item.litigantType === '' ? `${item.litigantName}` : `${item.litigantName}（${item.litigantType}）`;
        return result;
      });
      return newsData.join('；');
    }
    return '无';
  }
  viewDetail=(obj)=>{
    const docId = obj.content.docId;
    const trailDate = obj.content.trailDate;
    const url = obj.url;
    let monitorCompanyId = '';
    const actionId = Date.now();
    const reducerData = this.matchReducerByModule();
    if (this.props.module === 'laneGraph') {
      if (obj.relatedMonitorId) {
        monitorCompanyId = obj.relatedMonitorId;
      } else {
        monitorCompanyId = obj.mainMonitorId;
      }
    } else {
      monitorCompanyId = reducerData.info.monitorId;
    }
    const getUrl = `/api/monitor/${monitorCompanyId}/risk/judgeDoc?docId=${docId}&trailDate=${trailDate}`;
    this.props.commonBoundAC.getDetail(
      getUrl,
      ['judgeDocData', 'data'],
      'DETAILS_MODAL_UPDATE',
      obj,
      actionId,
      url,
      './judgeDoc/judgeDocTitle',
      './judgeDoc/judgeDocContent',
      '',
      'RISK_UPDATE_VALUE',
      ['events', 'loading', this.props.data.eventId]
    );
  }
  render() {
    const eventId = this.props.data.eventId;
    const data = {
      'hideConfig': [
        {'key': 'title', 'width': '12'},
      ],
      'viewConfig': [
        {'key': 'title', 'width': '12'},
        {'key': 'identity', 'width': '6'},
        {'key': 'publishDate', 'width': '6', 'handle': this.regTime},
        {'key': 'caseCode', 'width': '6'},
        {'key': 'court', 'width': '6'},
        {'key': 'litigant', 'width': '12', 'handle': this.modifyLitiganti},
        // {'key': 'detail', 'width': '12', 'handleBlock': this.modifyDetail}
      ],
      date: {
        label: '裁判日期',
        value: this.props.data.content.trailDate
      },
      'handleBlock': true,
      'dict': 'judgeDoc',
      'items': this.props.data,
      'typeName': this.props.data.dimName
    };
    return (<BaseModule type="judgeDoc"
            {...this.props}
            data={data}
            viewDetCallback={this.viewDetail}
            type="double"
            loading={this.props.reducerData.loading[eventId]}/>);
  }
}
