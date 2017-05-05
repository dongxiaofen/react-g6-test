import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function DishonestInfo({data, type}) {
  const regTime = (value)=>{
    let time;
    if (value) {
      time = value.slice(0, 10);
    } else {
      time = value;
    }
    return time;
  };
  const meta = {
    dict: 'dishonestyList',
    body: [
      {'key': 'publishDate', 'width': '6', 'modifyBlock': regTime},
      {'key': 'performance', 'width': '6'},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'gistId', 'width': '6'},
      {'key': 'courtName', 'width': '6'},
      {'key': 'gistUnit', 'width': '6'},
      {'key': 'disruptTypeName', 'width': '12'},
      {'key': 'duty', 'width': '12'}
    ],
    item: type === 'RULE' ? data.content : data.detail[0].dishonesty,
  };
  return (
    <SimpleCard meta={meta} />
  );
}

DishonestInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(DishonestInfo);
