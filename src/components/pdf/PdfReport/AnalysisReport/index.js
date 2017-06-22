import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import ComprehensiveAnalysis from './ComprehensiveAnalysis';
import pathval from 'pathval';
import PdfTitle from 'components/common/pdf/PdfTitle';

function AnalysisReport({judgeIsModuleExist, pdfStore}) {
  return (
    <div>
      {
        judgeIsModuleExist('SCORE') ?
          <div>
            <PdfTitle module="多维综合分析" />
            <ComprehensiveAnalysis moduleData={pathval.getPathValue(pdfStore, 'star')} />
          </div> : ''
      }
    </div>
  );
}

AnalysisReport.propTypes = {
  foo: PropTypes.string,
};
export default inject('pdfStore')(observer(AnalysisReport));
