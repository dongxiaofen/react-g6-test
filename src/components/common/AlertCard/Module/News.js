import React from 'react';
import { dealWithDate } from '../../../../helpers/common';
// import styles from './news.less';
import {observer} from 'mobx-react';
import BaseModule from '../BaseModule';
function News({data, module, reducerData}) {
  const viewDetail = () => {
    this.actionId = Date.now();
    let url = data.content.url;
    if (!url) {
      url = dealWithDate(data.content.title);
    }
    let companyId = '';
    if (module === 'laneGraph') {
      if (data.relatedMonitorId) {
        companyId = data.relatedMonitorId;
      } else {
        companyId = data.mainMonitorId;
      }
    } else {
      companyId = reducerData.info.monitorId;
    }

    const createdAt = data.content.createdAt;
    const enUrl = encodeURIComponent(url);
    const getUrl = `/api/monitor/${companyId}/internet/detail?createdAt=${createdAt}&url=${enUrl}`;
    this.props.commonBoundAC.getDetail(
      getUrl, ['newsData', 'data'],
      'DETAILS_MODAL_UPDATE',
      data,
      this.actionId,
      url,
      './news/newsTitle',
      './news/newsContent',
      './news/newsSource',
      'RISK_UPDATE_VALUE',
      ['events', 'loading', data.eventId]
    );
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
      btnText="查看"
      type="detail"
      viewDetCallback={viewDetail}
      loading={reducerData.loading.eventId}
      hasSecondType= {false}/>
  );
}
export default observer(News);
