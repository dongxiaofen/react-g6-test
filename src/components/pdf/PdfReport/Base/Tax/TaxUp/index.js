import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import TaxUpList from './TaxUpList';
import SecondTitle from 'components/common/pdf/SecondTitle';

function TaxUp({moduleData}) {
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
