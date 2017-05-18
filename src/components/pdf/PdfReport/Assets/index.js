import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import TradeMark from './IntangibleAssets/TradeMark';
import Patent from './IntangibleAssets/Patent';
import Bidding from './IntangibleAssets/Bidding';
import PdfTitle from 'components/common/pdf/PdfTitle';
import pathval from 'pathval';

function Assets({pdfStore, judgeIsModuleExist}) {
  return (
    <div>
      <div>
        <PdfTitle module="经营信息" />
        {judgeIsModuleExist('OPERATION_TRADEMARK') ? <TradeMark moduleData={pathval.getPathValue(pdfStore, 'trademark')} /> : ''}
        {judgeIsModuleExist('OPERATION_PATENT') ? <Patent moduleData={pathval.getPathValue(pdfStore, 'patent')} /> : ''}
        {judgeIsModuleExist('OPERATION_BIDDING') ? <Bidding moduleData={pathval.getPathValue(pdfStore, 'bidding')} /> : ''}
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
