import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';

function DishonestyInfo({moduleData}) {
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
      {'key': 'publishDate', 'width': '6'},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'regDate', 'width': '6'},
      {'key': 'gistId', 'width': '6'},
      {'key': 'gistUnit', 'width': '6'},
      {'key': 'courtName', 'width': '6'},
      {'key': 'performance', 'width': '6'},
      {'key': 'disruptTypeName', 'width': '12'},
      {'key': 'duty', 'width': '12'}
    ],
    item: moduleData,
    dict: 'dishonestyList',
    hasConfig: true,
    type: 'array'
  };
  return (
    <div>
      <div style={{height: '30px'}}></div>
      <PdfSimpleKey {...data} />
    </div>
  );
}

DishonestyInfo.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(DishonestyInfo);
