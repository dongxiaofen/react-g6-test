import React from 'react';
import BaseModule from '../BaseModule';
// import Loading from 'components/common/Loading';
import {observer} from 'mobx-react';
function JudgeDoc({module, data}) {
  const regTime = (value)=>{
    let time;
    if (value) {
      time = value.slice(0, 10);
    } else {
      time = value;
    }
    return time;
  };
  // const matchActionByModule = ()=>{
  //   switch (module) {
  //     case 'laneGraph':
  //       return this.props.laneGraphBoundAC;
  //     default:
  //       return this.props.reducerAction;
  //   }
  // };
  const matchReducerByModule = ()=>{
    switch (module) {
      case 'laneGraph':
        return this.props.laneGraph;
      default:
        return this.props.reducerData;
    }
  };
  const modifyLitiganti = (value)=>{
    if (value) {
      const newsData = value.map((item)=>{
        const result = item.litigantType === '' ? `${item.litigantName}` : `${item.litigantName}（${item.litigantType}）`;
        return result;
      });
      return newsData.join('；');
    }
    return '无';
  };
  const viewDetail = (obj)=>{
    const docId = obj.content.docId;
    const trailDate = obj.content.trailDate;
    const url = obj.url;
    let monitorCompanyId = '';
    const actionId = Date.now();
    const reducerData = matchReducerByModule();
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
      ['events', 'loading', data.eventId]
    );
  };
  const eventId = data.eventId;
  const moduleData = {
    'hideConfig': [
      {'key': 'title', 'width': '12'},
    ],
    'viewConfig': [
      {'key': 'title', 'width': '12'},
      {'key': 'identity', 'width': '6'},
      {'key': 'publishDate', 'width': '6', 'handle': regTime},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'litigant', 'width': '12', 'handle': modifyLitiganti},
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
          data={moduleData}
          viewDetCallback={viewDetail}
          type="double"
          loading={this.props.reducerData.loading[eventId]}/>);
}
export default observer(JudgeDoc);
