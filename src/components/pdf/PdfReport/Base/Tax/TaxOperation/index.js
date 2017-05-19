import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import TaxOperationList from './TaxOperationList';
import SecondTitle from 'components/common/pdf/SecondTitle';
import PdfNotFound from 'components/common/pdf/PdfNotFound';

function TaxOperation({moduleData}) {
  if (!moduleData || !moduleData.operating_capability) {
    return (
      <div>
        <SecondTitle module="营运能力指标"/>
        <PdfNotFound />
      </div>
    );
  }
  return (
    <div>
      <SecondTitle module="营运能力指标" />
      <TaxOperationList moduleData={moduleData} />
    </div>
  );
}

TaxOperation.propTypes = {
  taxStore: PropTypes.object,
};
export default observer(TaxOperation);
