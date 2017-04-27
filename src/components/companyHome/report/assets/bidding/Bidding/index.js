import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import { CardTable, ModuleTitle } from 'components/common/report/';
import { runInAction } from 'mobx';

function Bidding({biddingItemList, isLoading, detailModalStore, routing, assetsStore}) {
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
      }
    );
  };
  const handleClick = (foo, bar) => {
    console.log(bar);
    runInAction('show detail', () => {
      assetsStore.titleData = bar;
    });
    let companyId = '';
    let getUrl = '';
    if (routing.location.query.monitorId) {
      companyId = routing.location.query.monitorId;
      getUrl = `/api/monitor/${companyId}/operation/bidding/detail?announceId=${bar.announceID}`;
    } else {
      companyId = routing.location.query.reportId;
      getUrl = `/api/report/operation/bidding/detail?reportId=${companyId}&announceId=${bar.announceID}`;
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
export default inject('detailModalStore', 'routing', 'assetsStore')(observer(Bidding));
