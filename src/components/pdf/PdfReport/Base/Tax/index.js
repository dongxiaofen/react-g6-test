import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import TaxProfit from './TaxProfit';
import TaxOperation from './TaxOperation';
import TaxUp from './TaxUp';

function Tax({moduleData}) {
  return (
    <div>
      <TaxProfit moduleData={moduleData} />
      <TaxOperation moduleData={moduleData} />
      <TaxUp moduleData={moduleData} />
    </div>
  );
}

Tax.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(Tax);
