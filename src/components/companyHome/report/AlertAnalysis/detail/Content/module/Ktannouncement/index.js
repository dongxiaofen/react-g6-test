import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function Ktannouncement({data}) {
  const arrayToString = (arr)=>{
    let str;
    if (arr) {
      arr.forEach(item => {
        str += item.litigantName;
      });
    }
    return str;
  };
  const meta = {
    dict: 'courtNotice',
    body: [
      {'key': 'court', 'width': '6'},
      {'key': 'identity', 'width': '6'},
      {'key': 'judgeTime', 'width': '6'},
      {'key': 'litigant', 'width': '12', 'modifyBlock': arrayToString},
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
