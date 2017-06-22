import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import JudgeBox from './JudgeBox';
import { loadingComp } from 'components/hoc';

function JudgeDoc({courtData, regTime, routing, riskCourtStore}) {
  const getDetail = (data) => {
    const docId = data.docId;
    const trailDate = data.trailDate;
    const params = {docId, trailDate};
    riskCourtStore.getJudgeDetailReport(params, data);
  };
  const modifyTitile = (value, obj)=>{
    return <span className={styles.docTitle} onClick={getDetail.bind(null, obj)}>{value}</span>;
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
    'items': courtData.content,
    'dict': 'judgeDoc',
    'module': 'judgeDoc',
  };
  console.log(routing);
  return (
    <JudgeBox data={moduleData} />
  );
}

JudgeDoc.propTypes = {
  courtData: PropTypes.object,
  regTime: PropTypes.func,
  routing: PropTypes.object,
  riskCourtStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.loading,
    error: props.courtData.content.length === 0,
    module: '判决文书'
  })
})(inject('routing', 'riskCourtStore')(observer(JudgeDoc)));
