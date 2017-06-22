import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';

function OperateError({moduleData}) {
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
      {'key': 'abntime', 'width': '6'},
      {'key': 'retime', 'width': '6'},
      {'key': 'recause', 'width': '6'},
      {'key': 'decorg', 'width': '6'},
      {'key': 'specause', 'width': '12'}
    ],
    item: moduleData,
    dict: 'jyErrorData',
    type: 'array',
    hasConfig: true,
  };
  return (
    <div>
      <div style={{height: '30px'}}></div>
      <PdfSimpleKey {...data} />
    </div>
  );
}

OperateError.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(OperateError);
