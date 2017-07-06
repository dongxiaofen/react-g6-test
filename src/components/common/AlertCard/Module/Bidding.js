import React from 'react';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
// 经营招投标
function Bidding({data, module, store, cardType}) {
  const viewDetail = () => {
    let urlWithId = '';
    if (module === 'timeAxis') {
      urlWithId = data.monitorId ? `monitor/${data.monitorId}` : `report/${data.reportId}`;
    } else {
      urlWithId = `monitor/${store.events.info.monitorId}`;
    }
    const announceId = data.content.announceID;
    const params = {};
    params.announceId = announceId;
    store.getDetail('getBiddingDetail', urlWithId, params, data, 'bidding');
  };
  const eventId = data.eventId;
  const moduleData = {
    'hideConfig': [
      {'key': 'title', 'width': '12'},
    ],
    'viewConfig': [
      {'key': 'title', 'width': '12'},
      {'key': 'publishDate', 'width': '12'},
      {'key': 'participator', 'width': '12'},
    ],
    date: {
      label: '成交日期',
      value: data.content.date
    },
    'dict': 'bidding',
    'items': data,
    typeName: data.content.type
  };
  return (<BaseModule
            data={moduleData}
            viewDetCallback={viewDetail}
            type="double"
            module={module}
            loading={store.detailLoading.get(eventId)}
            cardType={cardType}/>);
}
export default observer(Bidding);