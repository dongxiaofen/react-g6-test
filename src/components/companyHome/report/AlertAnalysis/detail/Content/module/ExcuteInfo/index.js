import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function ExcuteInfo({data}) {
  const meta = {
    dict: 'courtExecuted',
    body: [
      {'key': 'pname', 'width': '6'},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'execCourtName', 'width': '6'},
      {'key': 'caseState', 'width': '6'},
      {'key': 'execMoney', 'width': '6'},
      {'key': 'caseCreateTime', 'width': '6'}
    ],
    item: data.content,
  };
  return (
    <SimpleCard meta={meta} />
  );
}

ExcuteInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(ExcuteInfo);
