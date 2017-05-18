import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import TradeMark from './IntangibleAssets/TradeMark';
import Patent from './IntangibleAssets/Patent';
import Bidding from './IntangibleAssets/Bidding';
import PdfTitle from 'components/common/pdf/PdfTitle';
import pathval from 'pathval';

function Assets({pdfStore}) {
  return (
    <div>
      <div>
        <PdfTitle module="经营信息" subModule="无形资产/招投标" />
        <TradeMark moduleData={pathval.getPathValue(pdfStore, 'trademark')} />
        <Patent moduleData={pathval.getPathValue(pdfStore, 'patent')} />
        <Bidding moduleData={pathval.getPathValue(pdfStore, 'bidding')} />
      </div>
    </div>
  );
}

Assets.propTypes = {
  judgeIsModuleExist: PropTypes.func,
  pdfStore: PropTypes.object,
  clientStore: PropTypes.object,
};
export default inject('clientStore', 'pdfStore')(observer(Assets));
