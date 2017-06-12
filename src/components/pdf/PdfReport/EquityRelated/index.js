import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import EquityFreeze from './EquityFreeze';
import EquityPledge from './EquityPledge';
import EquityTransfer from './EquityTransfer';
import PdfTitle from 'components/common/pdf/PdfTitle';
import pathval from 'pathval';

function EquityRelated({pdfStore}) {
  return (
    <div>
      <PdfTitle module="股权相关" subModule="股权冻结" />
      <EquityFreeze moduleData={pathval.getPathValue(pdfStore, 'shares.sharesFrostList')} />
      <PdfTitle module="股权相关" subModule="股权质押" />
      <EquityPledge moduleData={pathval.getPathValue(pdfStore, 'shares.sharesImpawnList')} />
      <PdfTitle module="股权相关" subModule="股权转让" />
      <EquityTransfer moduleData={pathval.getPathValue(pdfStore, 'shares.sharesTransferList')} />
    </div>
  );
}

EquityRelated.propTypes = {
  foo: PropTypes.string,
};
export default inject('pdfStore')(observer(EquityRelated));
