import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';

function CheckInfo({moduleData}) {
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
      // {'key': 'seqNo', 'width': '6'},
      {'key': 'checkDate', 'width': '6'},
      {'key': 'institution', 'width': '6'},
      {'key': 'checkType', 'width': '6'},
      {'key': 'checkResult', 'width': '6'},
    ],
    item: moduleData,
    dict: 'checkMessage',
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

CheckInfo.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(CheckInfo);
