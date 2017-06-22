import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';

function Bidding({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
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
      {'key': 'publishDate', 'width': '12'},
      {'key': 'type', 'width': '12'},
      {'key': 'participator', 'width': '12'},
    ],
    item: moduleData,
    dict: 'biddingList',
    hasConfig: true,
    type: 'array',
  };
  return (
    <div>
      <div style={{height: '30px'}}></div>
      <PdfSimpleKey {...data} />
    </div>
  );
}

Bidding.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(Bidding);
