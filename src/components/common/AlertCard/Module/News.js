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
    let companyId = '';
    if (module === 'timeAxis') {
      companyId = data.relatedMonitorId || data.mainMonitorId;
    } else {
      companyId = store.events.info.monitorId;
    }
    const params = {};
    params.url = url;
    params.createdAt = data.content.createdAt;
    store.getDetail('getNewsDetail', companyId, params, data, 'news');
    // const createdAt = data.content.createdAt;
    // const enUrl = encodeURIComponent(url);
    // const getUrl = `/api/monitor/${companyId}/internet/detail?createdAt=${createdAt}&url=${enUrl}`;
    // this.props.commonBoundAC.getDetail(
    //   getUrl, ['newsData', 'data'],
    //   'DETAILS_MODAL_UPDATE',
    //   data,
    //   this.actionId,
    //   url,
    //   './news/newsTitle',
    //   './news/newsContent',
    //   './news/newsSource',
    //   'RISK_UPDATE_VALUE',
    //   ['events', 'loading', data.eventId]
    // );
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
