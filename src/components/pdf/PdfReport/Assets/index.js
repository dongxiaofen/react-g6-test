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
        {judgeIsModuleExist('OPERATION_TRADEMARK') ?
        <div>
          <PdfTitle module="经营信息" />
          <TradeMark moduleData={pathval.getPathValue(pdfStore, 'trademark')} />
        </div> : ''}
        {judgeIsModuleExist('OPERATION_PATENT') ?
        <div>
          <PdfTitle module="经营信息" />
          <Patent moduleData={pathval.getPathValue(pdfStore, 'patent')} />
        </div> : ''}
        {judgeIsModuleExist('OPERATION_BIDDING') ?
        <div>
          <PdfTitle module="经营信息" />
          <Bidding moduleData={pathval.getPathValue(pdfStore, 'bidding')} />
        </div> : ''}
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
