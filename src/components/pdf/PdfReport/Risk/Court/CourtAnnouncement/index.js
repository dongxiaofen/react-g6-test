import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';

function CourtAnnouncement({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <div style={{height: '30px'}}></div>
        <PdfNotFound />
      </div>
    );
  }
  const handleRelevantDepartments = (data) => {
    let person = [];
    if (data.length === 0) {
      return '无';
    }
    data.forEach((item) => {
      person = [...person, item.litigantName];
    });
    return person.join('；');
  };
  const data = {
    dataConfig: [
      {'key': 'docType', 'width': '6'},
      {'key': 'publishTime', 'width': '6'},
      {'key': 'identity', 'width': '6'},
      {'key': 'caseReason', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'litigant', 'width': '12', 'handle': handleRelevantDepartments},
      {'key': 'content', 'width': '12'}
    ],
    item: moduleData,
    dict: 'courtAnnouncement',
    hasConfig: true,
    type: 'array'
  };
  return (
    <div>
      <div style={{height: '30px'}}></div>
      <PdfSimpleKey {...data} />
    </div>
  );
}

CourtAnnouncement.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(CourtAnnouncement);
