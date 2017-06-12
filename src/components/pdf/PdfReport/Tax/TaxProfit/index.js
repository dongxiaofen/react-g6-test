import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import TaxProfitList from './TaxProfitList/index';
import PdfNotFound from 'components/common/pdf/PdfNotFound';

function TaxProfit({moduleData}) {
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
      <TaxProfitList moduleData={moduleData} />
    </div>
  );
}

TaxProfit.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(TaxProfit);
