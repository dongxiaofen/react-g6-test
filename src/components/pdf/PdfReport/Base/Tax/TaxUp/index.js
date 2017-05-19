import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import TaxUpList from './TaxUpList';
import SecondTitle from 'components/common/pdf/SecondTitle';
import PdfNotFound from 'components/common/pdf/PdfNotFound';

function TaxUp({moduleData}) {
  if (!moduleData || !moduleData.operating_capability) {
    return (
      <div>
        <SecondTitle module="成长能力指标"/>
        <PdfNotFound />
      </div>
    );
  }
  return (
    <div>
      <SecondTitle module="成长能力指标" />
      <TaxUpList moduleData={moduleData} />
    </div>
  );
}

TaxUp.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(TaxUp);
