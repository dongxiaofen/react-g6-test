import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import TaxProfit from './TaxProfit/index';
import TaxOperation from './TaxOperation/index';
import TaxUp from './TaxUp/index';
import pathval from 'pathval';
import PdfTitle from 'components/common/pdf/PdfTitle';

function Tax({pdfStore}) {
  const moduleData = pathval.getPathValue(pdfStore, 'taxList');
  return (
        pdfStore.banner.mainStatus === 'MONITOR' ?
        <div>
          <PdfTitle module="税务信息" />
          <TaxProfit moduleData={moduleData} />
          <TaxOperation moduleData={moduleData} />
          <TaxUp moduleData={moduleData} />
        </div> : null
  );
}

Tax.propTypes = {
  moduleData: PropTypes.object,
};
export default inject('pdfStore')(observer(Tax));
