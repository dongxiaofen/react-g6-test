import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';

function CourtAnnouncement({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="法院公告" />
        <PdfNotFound />
      </div>
    );
  }
  const handleRelevantDepartments = (data) => {
    if (data.length === 0) {
      return '无';
    }
    return data.join(';');
  };
  const data = {
    dataConfig: [
      {'key': 'type', 'width': '6'},
      {'key': 'publishTime', 'width': '6'},
      {'key': 'identity', 'width': '6'},
      {'key': 'caseReason', 'width': '6'},
      {'key': 'court', 'width': '12'},
      {'key': 'relevantDepartments', 'width': '12', 'handle': handleRelevantDepartments},
      {'key': 'content', 'width': '12'}
    ],
    item: moduleData,
    dict: 'courtAnnouncement',
    hasConfig: true,
    type: 'array'
  };
  return (
    <div>
      <SecondTitle module="法院公告" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

CourtAnnouncement.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(CourtAnnouncement);
