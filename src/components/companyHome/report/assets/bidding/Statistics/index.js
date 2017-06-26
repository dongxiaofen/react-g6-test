import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';

function Statistics({ biddingData, loading }) {
  const data = {
    meta: {
      body: [
        { 'key': 'winMoneyAmount', 'width': '2.5' },
        { 'key': 'winCount', 'width': '2.5' },
        { 'key': 'bidMoneyAmount', 'width': '2.5' },
        { 'key': 'bidCount', 'width': '2.5'},
      ],
      tData: [biddingData],
      dict: 'biddingStatistic',
    },
    isLoading: loading,
    module: '招投标统计表',
    error: !biddingData || Object.keys(biddingData).length === 0,
  };
  return (
    <div>
      <ModuleTitle module="招投标统计表" />
      <CommonTable {...data} />
    </div>
  );
}

Statistics.propTypes = {
  loading: PropTypes.bool,
  biddingData: PropTypes.object,
};
export default observer(Statistics);
