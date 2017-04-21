import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import JudgeBox from './JudgeBox';

function JudgeDoc({courtData, regTime}) {
  const modifyTitile = (value)=>{
    return <span className={styles.docTitle}>{value}</span>;
  };
  const modifyLitiganti = (data)=>{
    if (data) {
      const newsData = data.map((item)=>{
        return item.litigantType ? `${item.litigantName}（${item.litigantType}）` : item.litigantName;
      });
      return newsData.join('；');
    }
    return '无';
  };
  const moduleData = {
    'hideConfig': [
      {'key': 'title', 'width': '12', 'handle': modifyTitile},
      {'key': 'identity', 'width': '6'},
      {'key': 'caseReason', 'width': '6'},
      {'key': 'trailDate', 'width': '6', 'handle': regTime},
      {'key': 'publishDate', 'width': '6', 'handle': regTime},
    ],
    'viewConfig': [
      {'key': 'title', 'width': '12', 'handle': modifyTitile},
      {'key': 'identity', 'width': '6'},
      {'key': 'caseReason', 'width': '6'},
      {'key': 'trailDate', 'width': '6', 'handle': regTime},
      {'key': 'publishDate', 'width': '6', 'handle': regTime},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'litigant', 'width': '12', 'handle': modifyLitiganti}
    ],
    'items': courtData,
    'dict': 'judgeDoc',
    'module': 'judgeDoc',
  };
  return (
    <JudgeBox data = {moduleData} />
  );
}

JudgeDoc.propTypes = {
  foo: PropTypes.string,
};
export default observer(JudgeDoc);
