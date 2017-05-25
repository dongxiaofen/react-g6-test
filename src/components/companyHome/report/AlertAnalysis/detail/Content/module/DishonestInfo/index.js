import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function DishonestInfo({data, type, ruleId}) {
  const regTime = (value)=>{
    let time;
    if (value) {
      time = value.slice(0, 10);
    } else {
      time = value;
    }
    return time;
  };
  const body = ruleId === 4 ?
    [
      {'key': 'companyName', 'width': '6', 'modifyBlock': regTime},
      {'key': 'relation', 'width': '6', 'modifyBlock': regTime},
      {'key': 'publishDate', 'width': '6', 'modifyBlock': regTime},
      {'key': 'performance', 'width': '6'},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'gistId', 'width': '6'},
      {'key': 'courtName', 'width': '6'},
      {'key': 'gistUnit', 'width': '6'},
      {'key': 'disruptTypeName', 'width': '12'},
      {'key': 'duty', 'width': '12'}
    ] :
    [
      {'key': 'publishDate', 'width': '6', 'modifyBlock': regTime},
      {'key': 'performance', 'width': '6'},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'gistId', 'width': '6'},
      {'key': 'courtName', 'width': '6'},
      {'key': 'gistUnit', 'width': '6'},
      {'key': 'disruptTypeName', 'width': '12'},
      {'key': 'duty', 'width': '12'}
    ];
  const itemData = type === 'RULE' ? data.content : data.detail[0].dishonesty;
  if (ruleId === 4) {
    itemData.relation = data.detail[0].relation.join('，');
    itemData.companyName = data.detail[0].companyName;
  }
  const meta = {
    dict: 'dishonestyList',
    body: body,
    item: itemData,
  };
  return (
    <SimpleCard meta={meta} />
  );
}

DishonestInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(DishonestInfo);
