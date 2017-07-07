import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function Fyannouncement({data}) {
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
    dict: 'courtAnnouncement',
    body: [
      {'key': 'type', 'width': '6'},
      {'key': 'identity', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'litigant', 'width': '12', 'modifyBlock': arrayToString},
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
