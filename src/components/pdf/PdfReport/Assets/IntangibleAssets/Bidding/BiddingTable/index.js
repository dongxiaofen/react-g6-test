import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import PdfTable from 'components/common/pdf/PdfTable';
import SecondTitle from 'components/common/pdf/SecondTitle';

function BiddingTable({pdfStore}) {
  const moduleData = pdfStore.bidding.month;
  const parseObject = () => {
    if (moduleData) {
      let newArr = [];
      Object.keys(moduleData).map((key) => {
        newArr = [Object.assign({date: key, ...moduleData[key]}), ...newArr];
      });
      return newArr;
    }
  };
  if (parseObject().length > 0) {
    const data = {
      dataConfig: [
        {key: 'date', width: '2'},
        {key: 'bidCount', width: '2'},
        {key: 'bidMoneyAmount', width: '2'},
        {key: 'winCount', width: '2'},
        {key: 'winMoneyAmount', width: '2'},
      ],
      items: parseObject(),
      dict: 'biddingTable',
    };
    return (
      <div>
        <SecondTitle module="招投标分析图"/>
        <PdfTable {...data} />
      </div>
    );
  }
  return null;
}

BiddingTable.propTypes = {
  moduleData: PropTypes.object,
};
export default inject('pdfStore')(observer(BiddingTable));
