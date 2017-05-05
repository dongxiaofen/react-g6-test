import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function Fyannouncement({data}) {
  const arrayToString = (arr)=>{
    let arr_ = arr;
    if (arr_) {
      arr_ = arr.join(',');
    }
    return arr_;
  };
  const meta = {
    dict: 'courtAnnouncement',
    body: [
      {'key': 'type', 'width': '6'},
      {'key': 'identity', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'relevantDepartments', 'width': '12', 'modifyBlock': arrayToString},
      {'key': 'content', 'width': '12'}
    ],
    item: data.content,
  };
  return (
    <SimpleCard meta={meta} />
  );
}

Fyannouncement.propTypes = {
  foo: PropTypes.string,
};
export default observer(Fyannouncement);
