import React from 'react';
import BaseModule from '../BaseModule';
import {observer} from 'mobx-react';
// 经营招投标
function Bidding({data, module, reducerData, store}) {
  const viewDetail = () => {
    // let companyId = '';
    // const actionId = Date.now();
    // if (module === 'laneGraph') {
    //   if (data.relatedMonitorId) {
    //     companyId = data.relatedMonitorId;
    //   } else {
    //     companyId = data.mainMonitorId;
    //   }
    // } else {
    //   companyId = reducerData.info.monitorId;
    // }
    // const announceId = data.content.announceID;
    // const getUrl = `/api/monitor/${companyId}/operation/bidding/detail?announceId=${announceId}`;
    console.log(store);
    // commonBoundAC.getDetail(
    //   getUrl,
    //   ['bidMarkertDetailData', 'result'],
    //   'DETAILS_MODAL_UPDATE',
    //   data,
    //   actionId,
    //   data.content.url,
    //   './bidMarket/bidMarketTitle',
    //   './bidMarket/bidMarketContent',
    //   './bidMarket/bidMarketSource',
    //   'RISK_UPDATE_VALUE',
    //   ['events', 'loading', data.eventId]
    // );
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
            loading={reducerData.loading[eventId]}/>);
}
export default observer(Bidding);
