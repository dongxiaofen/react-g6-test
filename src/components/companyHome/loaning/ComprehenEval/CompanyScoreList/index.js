import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanyScoreList({ sixStarData }) {
  // 综合评分
  let allInfo = '';
  const data = sixStarData.data;
  if (data && data.result && data.result.allInfo) {
    allInfo = (
      <div className={styles.title}>
        该企业综合评分
        <span className={styles.blueFonts}>
          { data.result.allInfo.score ? data.result.allInfo.score : '0'}
        </span>
        分
        {data.result.influence.comparation ?
          <span className={styles.data}>超过同行业同地区<span
            className={styles.blueFonts}>{data.result.influence.comparation}%</span>企业</span> : ''}
      </div>
    );
  }
  // 经营状况
  let operation = '';
  if (data && data.result && data.result.operation) {
    operation = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img1} />
          <span className={styles.type}>
            { data.result.operation.name}
          </span>
          <span className={styles.score}>
            <span>{ data.result.operation.score}</span>
            分
          </span>
          {data.result.operation.comparation ?
            <span className={styles.data}>(超过<span>{data.result.operation.comparation}%</span>企业)</span> : ''}
        </div>
        <div className={styles.text}>
          { data.result.operation.description}
        </div>
      </div>
    );
  }
  // 行业相关
  let industry = '';
  if (data && data.result && data.result.industry) {
    industry = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img2} />
          <span className={styles.type}>
            { data.result.industry.name}
          </span>
          <span className={styles.score}>
            <span>{ data.result.industry.score}</span>
            分
          </span>
          { data.result.industry.comparation ?
            <span className={styles.data}>(超过<span>{data.result.industry.comparation}%</span>企业)</span> : ''}
        </div>
        <div className={styles.text}>
          { data.result.industry.description}
        </div>
      </div>
    );
  }
  // 创新能力
  let creativity = '';
  if (data && data.result && data.result.creativity) {
    creativity = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img3} />
          <span className={styles.type}>
            { data.result.creativity.name}
          </span>
          <span className={styles.score}>
            <span>{ data.result.creativity.score}</span>
            分
          </span>
          { data.result.creativity.comparation ?
            <span className={styles.data}>(超过<span>{data.result.creativity.comparation}%</span>企业)</span> : ''}
        </div>
        <div className={styles.text}>
          { data.result.creativity.description}
        </div>
      </div>
    );
  }
  // 法务相关
  let law = '';
  if (data && data.result && data.result.law) {
    law = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img4}></i>
          <span className={styles.type}>
            合规程度
            {/* { data.result.law.name} */}
          </span>
          <span className={styles.score}>
            <span>{ data.result.law.score}</span>
            分
          </span>
          { data.result.law.comparation ?
            <span className={styles.data}>(超过<span>{data.result.law.comparation}%</span>企业)</span> : ''}
        </div>
        <div className={styles.text}>
          { data.result.law.description}
        </div>
      </div>
    );
  }
  // 团队相关
  let team = '';
  if (data && data.result && data.result.team) {
    team = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img5} />
          <span className={styles.type}>
            { data.result.team.name}
          </span>
          <span className={styles.score}>
            <span>{ data.result.team.score}</span>
            分
          </span>
          {data.result.team.comparation ?
            <span className={styles.data}>(超过<span>{data.result.team.comparation}%</span>企业)</span> : ''}
        </div>
        <div className={styles.text}>
          { data.result.team.description}
        </div>
      </div>
    );
  }
  // 社会影响力
  let influence = '';
  if (data && data.result && data.result.influence) {
    influence = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img6} />
          <span className={styles.type}>
            { data.result.influence.name}
          </span>
          <span className={styles.score}>
            <span>{ data.result.influence.score}</span>
            分
          </span>
          {data.result.influence.comparation ?
            <span className={styles.data}>(超过<span>{data.result.influence.comparation}%</span>企业)</span> : ''}
        </div>
        <div className={styles.text}>
          { data.result.influence.description}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.box}>
      {allInfo}
      <div className={styles.content}>
        <div className={styles.conWrap}>
          {operation}
          {industry}
          {creativity}
          {law}
          {team}
          {influence}
        </div>
      </div>
    </div>
  );
}

CompanyScoreList.propTypes = {
  alertAnalysisStore: PropTypes.object,
};
export default observer(CompanyScoreList);
