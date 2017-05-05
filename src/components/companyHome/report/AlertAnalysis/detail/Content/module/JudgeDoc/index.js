import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function JudgeDoc({data, type}) {
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
  const keyType = type === 'RULE' ? 'detail' : 'normal';
  const meta = {
    dict: 'judgeDoc',
    body: [
      {'key': 'title', 'width': '12'},
      {'key': 'identity', 'width': '6'},
      {'key': 'publishDate', 'width': '6'},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'litigant', 'width': '12', modifyBlock: modifyLitiganti},
      {'key': 'detail', 'width': '12', keyType: keyType},
    ],
    item: type === 'RULE' ? data.content : data.detail[0].judgeInfo,
  };
  return (
    <SimpleCard meta={meta} />
  );
}

JudgeDoc.propTypes = {
  foo: PropTypes.string,
};
export default observer(JudgeDoc);
