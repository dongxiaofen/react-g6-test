import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import PdfNotFound from 'components/common/pdf/PdfNotFound';
// import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';

function ComprehensiveAnalysis({moduleData}) {
  console.log(moduleData);
  return (
    <div>
      多维综合分析
    </div>
  );
}

ComprehensiveAnalysis.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(ComprehensiveAnalysis);
