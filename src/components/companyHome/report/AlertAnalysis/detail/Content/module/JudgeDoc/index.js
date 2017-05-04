import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function JudgeDoc({data}) {
  const modifyLitiganti = (value)=> {
    if (value) {
      const newsData = value.map((item)=>{
        const result = item.litigantType === '' ? `${item.litigantName}` : `${item.litigantName}（${item.litigantType}）`;
        return result;
      });
      return newsData.join('；');
    }
    return '无';
  };
  const meta = {
    dict: 'litigationAssets',
    body: [
      {'key': 'title', 'width': '12'},
      {'key': 'identity', 'width': '6'},
      {'key': 'publishDate', 'width': '6'},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'litigant', 'width': '12', modifyBlock: modifyLitiganti},
    ],
    item: data,
  };
  return (
    <SimpleCard meta={meta} />
  );
}

JudgeDoc.propTypes = {
  foo: PropTypes.string,
};
export default observer(JudgeDoc);
