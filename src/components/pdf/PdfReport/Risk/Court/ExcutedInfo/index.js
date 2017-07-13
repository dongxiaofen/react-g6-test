import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';

function ExcutedInfo({moduleData}) {
  console.log(123123213123123, moduleData.toJS());
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <div style={{height: '30px'}}></div>
        <PdfNotFound />
      </div>
    );
  }
  const parseData = (value) => {
    if (value === '0' || value === '1') {
      return '--';
    }
    return value;
  };
  const data = {
    dataConfig: [
      {'key': 'pname', 'width': '6'},
      {'key': 'caseCreateTime', 'width': '6'},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'execCourtName', 'width': '6'},
      {'key': 'caseState', 'width': '6', handle: parseData},
      {'key': 'execMoney', 'width': '6'}
    ],
    item: moduleData,
    dict: 'courtExecuted',
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

ExcutedInfo.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(ExcutedInfo);
