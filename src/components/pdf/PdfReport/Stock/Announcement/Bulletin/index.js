import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';

function Bulletin({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="公告列表" />
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'title', 'width': '12'},
      {'key': 'type', 'width': '6'},
      {'key': 'announcementTime', 'width': '6'},
    ],
    item: moduleData,
    dict: 'stockAnnouncement',
    hasConfig: true,
    type: 'array',
  };
  return (
    <div>
      <SecondTitle module="公告列表" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

Bulletin.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(Bulletin);
