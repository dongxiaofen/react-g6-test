import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';

function EquityFreeze({moduleData}) {
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
      {'key': 'freOrgName', 'width': '4'},
      {'key': 'unfreOrgName', 'width': '4'},
      {'key': 'freFromDate', 'width': '4'},
      {'key': 'freMoney', 'width': '4'},
      {'key': 'freRatio', 'width': '4'},
      {'key': 'unfreInfo', 'width': '4'},
    ],
    hasConfig: true,
    item: moduleData,
    dict: 'equityFreeze',
    type: 'array'
  };
  return (
    <div>
      <div style={{marginTop: '30px'}}></div>
      <PdfSimpleKey {...data} />
    </div>
  );
}

EquityFreeze.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(EquityFreeze);
