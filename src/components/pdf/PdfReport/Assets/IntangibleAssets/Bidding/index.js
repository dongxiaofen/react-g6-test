import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import BiddingCount from './BiddingCount';
import BiddingTable from './BiddingTable';
import SecondTitle from 'components/common/pdf/SecondTitle';


function Bidding({moduleData}) {
  if (!moduleData || Object.keys(moduleData).length === 0) {
    return (
      <div>
        <div style={{height: '30px'}}></div>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'title', 'width': '12'},
      {'key': 'publishedDateTime', 'width': '12', handle: (val) => val.slice(0, 10)},
      {'key': 'announceType', 'width': '12'},
      {'key': 'participator', 'width': '12'},
    ],
    item: moduleData.result,
    dict: 'biddingList',
    hasConfig: true,
    type: 'array',
  };
  return (
    <div>
      <BiddingCount />
      <BiddingTable />
      <div>
        <SecondTitle module="招投标信息"/>
        <PdfSimpleKey {...data} />
      </div>
    </div>
  );
}

Bidding.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(Bidding);
