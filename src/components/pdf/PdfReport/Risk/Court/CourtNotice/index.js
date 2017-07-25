import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';

function CourtNotice({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <div style={{height: '30px'}}></div>
        <PdfNotFound />
      </div>
    );
  }
  const handleRelevantDepartments = (data) => {
    let nameArr = [];
    if (!data || data.length === 0) {
      return '无';
    }
    data.forEach((item) => {
      nameArr = [...nameArr, item.litigantName];
    });
    return nameArr.join('；');
  };
  const data = {
    dataConfig: [
      {'key': 'identity', 'width': '6'},
      {'key': 'caseReason', 'width': '6'},
      {'key': 'judgeTime', 'width': '6', 'handle': this.regTime},
      {'key': 'court', 'width': '6'},
      {'key': 'litigant', 'width': '12', 'handle': handleRelevantDepartments},
      {'key': 'detail', 'width': '12'}
    ],
    item: moduleData,
    dict: 'courtNotice',
    type: 'array',
    hasConfig: true,
  };
  return (
    <div>
      <div style={{height: '30px'}}></div>
      <PdfSimpleKey {...data} />
    </div>
  );
}

CourtNotice.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(CourtNotice);
