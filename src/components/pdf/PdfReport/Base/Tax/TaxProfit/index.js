import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import TaxProfitList from './TaxProfitList';
import SecondTitle from 'components/common/pdf/SecondTitle';
import PdfNotFound from 'components/common/pdf/PdfNotFound';

function TaxProfit({moduleData}) {
  if (!moduleData || !moduleData.operating_profit) {
    return (
      <div>
        <SecondTitle module="盈利能力指标"/>
        <PdfNotFound />
      </div>
    );
  }
  return (
    <div>
      <SecondTitle module="盈利能力指标" />
      <TaxProfitList moduleData={moduleData} />
    </div>
  );
}

TaxProfit.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(TaxProfit);
