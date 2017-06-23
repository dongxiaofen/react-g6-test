import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import PdfTable from 'components/common/pdf/PdfTable';

function BiddingCount({pdfStore}) {
  const moduleData = pdfStore.bidding.statistic;
  if (moduleData) {
    console.log('moduleData', moduleData);
    const data = {
      dataConfig: [
        {key: 'bidCount', width: '2'},
        {key: 'bidMoneyAmount', width: '2'},
        {key: 'winCount', width: '2'},
        {key: 'winMoneyAmount', width: '2'},
      ],
      items: [
        {
          bidCount: moduleData.bidCount,
          bidMoneyAmount: moduleData.bidMoneyAmount,
          winCount: moduleData.winCount,
          winMoneyAmount: moduleData.winMoneyAmount,
        },
      ],
      dict: 'biddingCount',
    };
    return (
      <div>
        <div style={{height: '30px'}}></div>
        <PdfTable {...data} />
      </div>
    );
  }
  return null;
}

BiddingCount.propTypes = {
  pdfStore: PropTypes.object,
};
export default inject('pdfStore')(observer(BiddingCount));
