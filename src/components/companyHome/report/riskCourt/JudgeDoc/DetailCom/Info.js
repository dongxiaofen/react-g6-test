import React from 'react';
import {observer, inject} from 'mobx-react';
import JudgeCard from '../JudgeBox/JudgeCard';
function Info({riskCourtStore}) {
  const itemData = riskCourtStore.court.detailModalData.info;
  const regTime = (value)=>{
    return value ? value.slice(0, 10) : '无';
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
  const data = {
    'viewConfig': [
      {'key': 'title', 'width': '12'},
      {'key': 'identity', 'width': '6'},
      {'key': 'caseReason', 'width': '6'},
      {'key': 'trailDate', 'width': '6', 'handle': regTime},
      {'key': 'publishDate', 'width': '6', 'handle': regTime},
      {'key': 'caseCode', 'width': '6'},
      {'key': 'court', 'width': '6'},
      {'key': 'litigant', 'width': '12', 'handle': modifyLitiganti}
    ],
    'items': itemData,
    'dict': 'judgeDoc',
    'module': 'judgeDoc',
  };
  return <JudgeCard itemData={itemData} data={data} type="modal"/>;
}
export default inject('riskCourtStore')(observer(Info));
