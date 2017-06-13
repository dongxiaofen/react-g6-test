import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import ComprehensiveAnalysis from './ComprehensiveAnalysis';
import pathval from 'pathval';

function AnalysisReport({judgeIsModuleExist, pdfStore}) {
  return (
    <div>
      {
        judgeIsModuleExist('SCORE') ? <ComprehensiveAnalysis moduleData={pathval.getPathValue(pdfStore, 'start')} /> : ''
      }
    </div>
  );
}

AnalysisReport.propTypes = {
  foo: PropTypes.string,
};
export default inject('pdfStore')(observer(AnalysisReport));
