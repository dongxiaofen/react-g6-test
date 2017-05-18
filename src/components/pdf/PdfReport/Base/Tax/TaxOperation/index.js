import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import TaxOperationList from './TaxOperationList';
import SecondTitle from 'components/common/pdf/SecondTitle';

function TaxOperation({moduleData}) {
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
