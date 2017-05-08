import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';

function CheckInfo({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="抽查检查信息" />
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'check_date', 'width': '6'},
      {'key': 'institution', 'width': '6'},
      {'key': 'check_type', 'width': '6'},
      {'key': 'check_result', 'width': '6'}
    ],
    item: moduleData,
    dict: 'checkMessage',
    hasConfig: true,
    type: 'array',
  };
  return (
    <div>
      <SecondTitle module="抽查检查信息" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

CheckInfo.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(CheckInfo);
