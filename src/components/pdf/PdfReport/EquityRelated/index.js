import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import EquityFreeze from './EquityFreeze';
import EquityPledge from './EquityPledge';
import EquityTransfer from './EquityTransfer';
// import CorporateMortgage from './CorporateMortgage';
import PdfTitle from 'components/common/pdf/PdfTitle';
import pathval from 'pathval';

function EquityRelated({pdfStore, judgeIsModuleExist}) {
  return (
    <div>
      {
        judgeIsModuleExist('PLEDGE_EQUITY_SHARE') ? <div>
          <PdfTitle module="股权相关" subModule="股权冻结" />
          <EquityFreeze moduleData={pathval.getPathValue(pdfStore, 'shares.sharesFrostList')} />
        </div> : ''
      }
      {
        judgeIsModuleExist('PLEDGE_EQUITY_SHARE') ? <div>
          <PdfTitle module="股权相关" subModule="股权质押" />
          <EquityPledge moduleData={pathval.getPathValue(pdfStore, 'shares.sharesImpawnList')} />
          <PdfTitle module="股权相关" subModule="股权转让" />
          <EquityTransfer moduleData={pathval.getPathValue(pdfStore, 'shares.sharesTransferList')} />
          {/*<PdfTitle module="抵押相关" subModule="企业抵押" />*/}
          {/*<CorporateMortgage moduleData={pathval.getPathValue(pdfStore, 'shares.sharesFrostList')} />*/}
        </div> : ''
      }
    </div>
  );
}

EquityRelated.propTypes = {
  foo: PropTypes.string,
};
export default inject('pdfStore')(observer(EquityRelated));
