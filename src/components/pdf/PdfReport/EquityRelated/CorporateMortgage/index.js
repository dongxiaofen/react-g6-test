import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';

function CorporateMortgage({moduleData}) {
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
      {'key': 'imporgAthOrg', 'width': '4'},
      {'key': 'imporgType', 'width': '4'},
      {'key': 'pledgedAmount', 'width': '4'},
      {'key': 'imporgDate', 'width': '4'},
      // {'key': 'unfreInfo', 'width': '4'},
    ],
    hasConfig: true,
    item: moduleData,
    dict: 'corporateMortgage',
    type: 'array'
  };
  return (
    <div>
      <div style={{marginTop: '30px'}}></div>
      <PdfSimpleKey {...data} />
    </div>
  );
}

CorporateMortgage.propTypes = {
  foo: PropTypes.string,
};
export default observer(CorporateMortgage);
