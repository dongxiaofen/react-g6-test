import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
// import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';

function JudgeDoc({}) {
  // const moduleData = this.props.data.getIn(['report', 'risk', 'court', 'judgeDoc', 'data']);
  // const listSize = this.props.data.getIn(['report', 'risk', 'court', 'countCount', '判决文书']);
  // if (!moduleData) {
  //   return (
  //     <div>
  //       <SecondTitle module="判决文书" />
  //       <PdfNotFound />
  //     </div>
  //   );
  // }
  return (
    <div>
      <SecondTitle module="判决文书" />
      <PdfNotFound />
      待修改
    </div>
  );
}


JudgeDoc.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(JudgeDoc);
