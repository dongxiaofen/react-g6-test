import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import PdfSimpleKey from 'components/common/pdf/PdfSimpleKey';
import SecondTitle from 'components/common/pdf/SecondTitle';

function LitigationAssets({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="涉诉资产" />
        <PdfNotFound />
      </div>
    );
  }
  const data = {
    dataConfig: [
      {'key': 'title', 'width': '12'},
      {'key': 'releaseTime', 'width': '6'},
      {'key': 'price', 'width': '6'},
      {'key': 'category', 'width': '6'},
      {'key': 'status', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'projectNotice', 'width': '12'},
    ],
    item: moduleData,
    dict: 'litigationAssets',
    hasConfig: true,
    type: 'array',
  };
  return (
    <div>
      <SecondTitle module="涉诉资产" />
      <PdfSimpleKey {...data} />
    </div>
  );
}

LitigationAssets.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(LitigationAssets);
