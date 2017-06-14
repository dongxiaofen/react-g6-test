import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import TaxProfit from './TaxProfit/index';
import TaxUp from './TaxUp/index';
import TaxOperation from './TaxOperation/index';
import pathval from 'pathval';
import PdfTitle from 'components/common/pdf/PdfTitle';

function Tax({pdfStore, judgeIsModuleExist}) {
  return (
        <div>
          {
            judgeIsModuleExist('PROFIT') ?
            <div>
                <PdfTitle module="盈利能力分析" subModule="盈利能力分析" />
                <TaxProfit moduleData={pathval.getPathValue(pdfStore, 'profit')} />
            </div> : ''
          }
          {
            judgeIsModuleExist('OPERATION') ?
              <div>
                <PdfTitle module="盈利能力分析" subModule="营运能力分析" />
                <TaxOperation moduleData={pathval.getPathValue(pdfStore, 'operation')} />
              </div> : ''
          }
          {
            judgeIsModuleExist('GROWING') ?
              <div>
                <PdfTitle module="盈利能力分析" subModule="成长能力分析" />
                <TaxUp moduleData={pathval.getPathValue(pdfStore, 'growing')} />
              </div> : ''
          }
        </div>
  );
}

Tax.propTypes = {
  moduleData: PropTypes.object,
};
export default inject('pdfStore')(observer(Tax));
