import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function ErrorInfo({data, type}) {
  const itemData = type === 'RULE' ? data.content : data.detail[0];
  itemData.abntime = itemData.event_time || itemData.abntime;
  const meta = {
    dict: 'jyErrorData',
    body: [
      {'key': 'abntime', 'width': '12'},
      {'key': 'decorg', 'width': '12'},
      {'key': 'specause', 'width': '12'}
    ],
    item: itemData,
  };
  return (
    <SimpleCard meta={meta} />
  );
}

ErrorInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(ErrorInfo);
