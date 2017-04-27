import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import { CardTable, ModuleTitle } from 'components/common/report/';

function Bidding({biddingItemList, isLoading, detailModalStore}) {
  const handleClick = (foo, bar) => {
    console.log(foo, bar);
    detailModalStore.openDetailModal(
      (cb) => {
        require.ensure([], (require) => {
          cb(
            require('./title'),
            require('./content'),
            // 如果没有来源，可以不传
            require('./source')
          );
        });
      }
    );
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
export default inject('detailModalStore')(observer(Bidding));
