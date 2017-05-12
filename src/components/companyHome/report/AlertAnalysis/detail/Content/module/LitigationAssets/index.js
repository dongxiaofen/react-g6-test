import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function LitigationAssets({data}) {
  const meta = {
    dict: 'litigationAssets',
    body: [
      {'key': 'title', 'width': '12'},
      {'key': 'category', 'width': '6'},
      {'key': 'status', 'width': '6'},
      {'key': 'court', 'width': '12'},
      {'key': 'projectNotice', 'width': '12'},
    ],
    item: data.content,
  };
  return (
    <SimpleCard meta={meta} />
  );
}

LitigationAssets.propTypes = {
  foo: PropTypes.string,
};
export default observer(LitigationAssets);
