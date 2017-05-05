import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function NewsAnalyse({moduleData}) {
  if (!moduleData) {
    return (
      <div>
        <SecondTitle module="新闻分析" />
        <PdfNotFound />
      </div>
    );
  }
  const scoreFormat = (score) => {
    if (score) {
      return Math.round(score);
    }
    return 0;
  };
  const createNewsAnalyse = (data) => {
    const list = [];
    const showKeys = ['newsImpact', 'mediaRating', 'newsRepu', 'newsCount'];
    const keys = ['媒体影响力', '媒体等级', '新闻口碑', '新闻数量'];
    showKeys.map((key, index) => {
      list.push(
        <div key={`${index}newsAnalyse`} className={styles.newsItem}>
          <div className={styles.newsScore}>{scoreFormat(data[key].score)}分</div>
          <h2 className={styles.newsDim}>{keys[index]}</h2>
          <p className={styles.newsDesc}>{data[key].desc}</p>
        </div>
      );
    });
    return list;
  };
  return (
    <div>
      <SecondTitle module="新闻分析" />
      {createNewsAnalyse(moduleData)}
    </div>
  );
}

NewsAnalyse.propTypes = {
  moduleData: PropTypes.objectOrObservableObject,
};
export default observer(NewsAnalyse);
