import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import TaxInfo from './TaxInfo';

function Tax({riskStore}) {
  const taxList = riskStore.taxList;
  return (
    <div>
      <TaxInfo taxList={taxList}/>
    </div>
  );
}

Tax.propTypes = {
  riskStore: PropTypes.object,
};
export default observer(Tax);
