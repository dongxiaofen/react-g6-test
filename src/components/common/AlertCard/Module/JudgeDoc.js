import React from 'react';
import BaseModule from '../BaseModule';
// import Loading from 'components/common/Loading';
import {observer} from 'mobx-react';
function JudgeDoc({data, store, module, cardType}) {
  const regTime = (value)=>{
    let time;
    if (value) {
      time = value.slice(0, 10);
    } else {
      time = value;
    }
    return time;
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
    let urlWithId = '';
    if (module === 'timeAxis') {
      urlWithId = data.monitorId ? `monitor/${data.monitorId}` : `report/${data.reportId}`;
    } else {
      urlWithId = `monitor/${store.events.info.monitorId}`;
    }
    const params = {docId, trailDate};
    store.getDetail('getJudgeDocDetail', urlWithId, params, data);
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
  return (<BaseModule
          type="judgeDoc"
          module={module}
          data={moduleData}
          viewDetCallback={viewDetail}
          type="double"
          loading={store.detailLoading.get(eventId)}
          cardType={cardType}/>);
}
export default observer(JudgeDoc);
