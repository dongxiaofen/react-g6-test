import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import TaxOperationList from './TaxOperationList/index';
import PdfNotFound from 'components/common/pdf/PdfNotFound';

function TaxOperation({moduleData}) {
  if (!moduleData || Object.keys(moduleData).length === 0) {
    return (
      <div>
        <div style={{marginTop: '30px'}}></div>
        <PdfNotFound />
      </div>
    );
  }
  return (
    <div>
      <div style={{marginTop: '30px'}}></div>
      <TaxOperationList moduleData={moduleData} />
    </div>
  );
}

TaxOperation.propTypes = {
  taxStore: PropTypes.object,
};
export default observer(TaxOperation);
