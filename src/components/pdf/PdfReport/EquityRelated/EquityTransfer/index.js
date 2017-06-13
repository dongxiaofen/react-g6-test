import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';

function EquityTransfer({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <div style={{marginTop: '30px'}}></div>
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'imporg', 'width': '4'},
      {'key': 'assignee', 'width': '4'},
      {'key': 'pledgeDate', 'width': '4'},
      {'key': 'pledgedAmount', 'width': '4'},
      {'key': 'transfersRatio', 'width': '4'},
      {'key': 'transfersRatio', 'width': '4'},
    ],
    hasConfig: true,
    item: moduleData,
    dict: 'equityTransfer',
    type: 'array'
  };
  return (
    <div>
      <div style={{marginTop: '30px'}}></div>
      <PdfSimpleKey {...data} />
    </div>
  );
}

EquityTransfer.propTypes = {
  foo: PropTypes.string,
};
export default observer(EquityTransfer);
