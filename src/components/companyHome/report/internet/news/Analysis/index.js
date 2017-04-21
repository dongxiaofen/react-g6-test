import React from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import ErrorText from 'components/hoc/LoadingComp/ErrorText';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import styles from './index.less';
function Analysis({internetStore}) {
  const data = internetStore.analysis.data;
  const scoreFormat = (score) => {
    if (score) {
      return Math.round(score);
    }
    return 0;
  };
  const newsAnalyse = () => {
    const list = [];
    const showKeys = ['newsImpact', 'mediaRating', 'newsRepu', 'newsCount'];
    const keys = ['媒体影响力', '媒体等级', '新闻口碑', '新闻数量'];
    showKeys.map((key, index) => {
      list.push(
        <div key={key} className={styles.newsItem}>
          <div className={styles.newsScore}>{scoreFormat(data[key].score)}分</div>
          <h2 className={styles.newsDim}>{keys[index]}</h2>
          <p className={styles.newsDesc}>{data[key].desc}</p>
        </div>
      );
    });
    return list;
  };
  let output;
  const error = internetStore.analysis.error;
  console.log(error, '======');
  if (error && error.errorCode === 404208) {
    output = <ErrorText error={{message: '暂无信息，平台正为您实时抓取新闻，请五分钟后再浏览'}} />;
  } else if (error) {
    output = <ErrorText module="新闻分析" errCategory={0} />;
  } else if (data) {
    output = newsAnalyse();
  } else if (data === undefined) {
    output = <AnimateLoading />;
  }
  return (
    <div>
      <ModuleTitle module="新闻分析" />
      {output}
    </div>
  );
}
export default observer(Analysis);
