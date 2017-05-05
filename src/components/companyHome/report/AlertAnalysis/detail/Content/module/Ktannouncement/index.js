import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function Ktannouncement({data}) {
  const arrayToString = (arr)=>{
    let arr_ = arr;
    if (arr_) {
      arr_ = arr.join(',');
    }
    return arr_;
  };
  const meta = {
    dict: 'courtNotice',
    body: [
      {'key': 'court', 'width': '6'},
      {'key': 'identity', 'width': '6'},
      {'key': 'judgeTime', 'width': '6'},
      {'key': 'relevantDepartments', 'width': '12', 'modifyBlock': arrayToString},
      {'key': 'content', 'width': '12'}
    ],
    item: data.content,
  };
  return (
    <SimpleCard meta={meta} />
  );
}

Ktannouncement.propTypes = {
  foo: PropTypes.string,
};
export default observer(Ktannouncement);
