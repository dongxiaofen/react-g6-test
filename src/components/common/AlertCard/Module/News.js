import React from 'react';
import { dealWithDate } from '../../../../helpers/common';
// import styles from './news.less';
import {observer, inject} from 'mobx-react';
import BaseModule from '../BaseModule';
function News({data, module, store, cardType}) {
  const viewDetail = () => {
    let url = data.content.url;
    if (!url) {
      url = dealWithDate(data.content.title);
    }
    let urlWithId = '';
    if (module === 'timeAxis') {
      urlWithId = data.monitorId ? `monitor/${data.monitorId}` : `report/${data.reportId}`;
    } else {
      urlWithId = `monitor/${store.events.info.monitorId}`;
    }
    const params = {};
    params.url = url;
    params.createdAt = data.content.createdAt;
    store.getDetail('getNewsDetail', urlWithId, params, data, 'news');
  };
  const moduleData = {
    'hideConfig': [
      {'key': 'title', 'width': '12'},
    ],
    'viewConfig': [
      {'key': 'title', 'width': '12'},
    ],
    date: {
      label: '发布日期',
      value: data.content.date
    },
    'handleBlock': true,
    'actionToUrl': true,
    'dict': 'news',
    'items': data,
    typeName: data.dimensionGroup ? data.dimensionGroup.split(',')[0] : ''
  };
  return (
    <BaseModule
      data={moduleData}
      module={module}
      btnText="查看"
      type="detail"
      viewDetCallback={viewDetail}
      loading={store.detailLoading.get(data.eventId) ? true : false}
      hasSecondType= {false}
      cardType = {cardType}/>
  );
}
export default inject('detailModalStore')(observer(News));
