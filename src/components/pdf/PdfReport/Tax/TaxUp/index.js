import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import TaxUpList from './TaxUpList/index';
import PdfNotFound from 'components/common/pdf/PdfNotFound';

function TaxUp({moduleData}) {
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
      <TaxUpList moduleData={moduleData} />
    </div>
  );
}

TaxUp.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(TaxUp);
