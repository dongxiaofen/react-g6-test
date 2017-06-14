import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import { CardTable, ModuleTitle } from 'components/common/report/';
import { runInAction } from 'mobx';

function Bidding({biddingItemList, isLoading, detailModalStore, companyHomeStore, assetsStore}) {
  const showDetail = () => {
    detailModalStore.openDetailModal(
      (cb) => {
        require.ensure([], (require) => {
          cb(
            require('../bidMarket/BidMarketReportTittle'),
            require('../bidMarket/BidMarketContent'),
            require('../bidMarket/BidMarketSource'),
          );
        });
      },
      '经营详情'
    );
  };
  const handleClick = (foo, bar) => {
    runInAction('show detail', () => {
      assetsStore.titleData = bar;
    });
    const { basicReportId, reportId } = companyHomeStore.reportInfo;
    let getUrl = '';
    if (reportId) {
      getUrl = `/api/reportId/${reportId}/operation/bidding/detail?announceId=${bar.announceID}`;
    } else if (basicReportId) {
      getUrl = `/api/basicReport/${basicReportId}/operation/bidding/detail?announceId=${bar.announceID}`;
    } else {
      return false;
    }
    assetsStore.getDetail(getUrl, showDetail);
  };
  const data = {
    meta: {
      title: {
        main: 'title',
        handleClick: handleClick
      },
      body: [
        { 'key': 'date', 'width': '12', },
        { 'key': 'type', 'width': '12' },
        { 'key': 'participator', 'width': '12' },
      ],
      isExpand: false,
      dict: 'biddingList',
      cData: biddingItemList
    },
    isLoading: isLoading,
    module: '专利信息',
    error: biddingItemList.length === 0
  };

  return (
    <div>
      <ModuleTitle module="招投标信息" />
      <CardTable {...data} />
    </div>
  );
}

Bidding.propTypes = {
  foo: PropTypes.string,
};
export default inject('detailModalStore', 'companyHomeStore', 'assetsStore')(observer(Bidding));
