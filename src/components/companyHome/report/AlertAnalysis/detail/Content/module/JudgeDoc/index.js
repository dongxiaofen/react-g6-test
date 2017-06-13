import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function JudgeDoc({data, type, ruleId, dataStore}) {
  const modifyLitiganti = (value)=> {
    if (value) {
      const newsData = value.map((item)=>{
        const result = item.litigantType === '' ? `${item.litigantName}` : `${item.litigantName}（${item.litigantType}）`;
        return result;
      });
      return newsData.join('；');
    }
    return '--';
  };
  const body = (ruleId === 2 || ruleId === 4 || ruleId === 6) ?
    [
      {'key': 'companyName', 'width': '6'},
      {'key': 'relation', 'width': '6'},
      {'key': 'title', 'width': '12'},
      {'key': 'identity', 'width': '6'},
      {'key': 'publishDate', 'width': '6'},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'litigant', 'width': '12', modifyBlock: modifyLitiganti},
      {'key': 'detail', 'width': '12', keyType: 'detail'},
    ] : [
      {'key': 'title', 'width': '12'},
      {'key': 'identity', 'width': '6'},
      {'key': 'publishDate', 'width': '6'},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'litigant', 'width': '12', modifyBlock: modifyLitiganti},
      {'key': 'detail', 'width': '12', keyType: 'detail'},
    ];
  const itemData = type === 'RULE' ? data.content : data.detail[0].judgeInfo;
  if (ruleId === 2 || ruleId === 4 || ruleId === 6) {
    itemData.companyName = data.detail[0].companyName;
    if (data.detail[0].relation && data.detail[0].relation.length > 0) {
      itemData.relation = data.detail[0].relation.join('，');
    }
  }
  const meta = {
    dict: 'judgeDoc',
    body: body,
    item: itemData,
  };
  return (
    <SimpleCard meta={meta} dataStore={dataStore}/>
  );
}

JudgeDoc.propTypes = {
  foo: PropTypes.string,
};
export default observer(JudgeDoc);
