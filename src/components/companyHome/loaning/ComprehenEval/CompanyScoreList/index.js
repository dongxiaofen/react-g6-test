import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanyScoreList({ sixStarData }) {
  // 综合评分
  let allInfo = '';
  if (sixStarData && sixStarData.result.allInfo) {
    allInfo = (
      <div className={styles.title}>
        该企业综合评分
        <span className={styles.blueFonts}>
          {sixStarData.result.allInfo.score ? sixStarData.result.allInfo.score : '0'}
        </span>
        分
        {<span className={styles.data}>超过同行业同地区<span className={styles.blueFonts}>70%</span>企业</span>}
      </div>
    );
  }
  // 经营状况
  let operation = '';
  if (sixStarData && sixStarData.result.operation) {
    operation = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img1}/>
          <span className={styles.type}>
            {sixStarData.result.operation.name}
          </span>
          <span className={styles.score}>
            <span>{sixStarData.result.operation.score}</span>
            分
          </span>
          {<span className={styles.data}>(超过<span>70%</span>企业)</span>}
        </div>
        <div className={styles.text}>
          {sixStarData.result.operation.description}
        </div>
      </div>
    );
  }
  // 行业相关
  let industry = '';
  if (sixStarData && sixStarData.result.industry) {
    industry = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img2}/>
          <span className={styles.type}>
            {sixStarData.result.industry.name}
          </span>
          <span className={styles.score}>
            <span>{sixStarData.result.industry.score}</span>
            分
          </span>
          { <span className={styles.data}>(超过<span>70%</span>企业)</span>}
        </div>
        <div className={styles.text}>
          {sixStarData.result.industry.description}
        </div>
      </div>
    );
  }
  // 创新能力
  let creativity = '';
  if (sixStarData && sixStarData.result.creativity) {
    creativity = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img3}/>
          <span className={styles.type}>
            {sixStarData.result.creativity.name}
          </span>
          <span className={styles.score}>
            <span>{sixStarData.result.creativity.score}</span>
            分
          </span>
          { <span className={styles.data}>(超过<span>70%</span>企业)</span>}
        </div>
        <div className={styles.text}>
          {sixStarData.result.creativity.description}
        </div>
      </div>
    );
  }
  // 法务相关
  let law = '';
  if (sixStarData && sixStarData.result.law) {
    law = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img4}></i>
          <span className={styles.type}>
            合规程度
            {/* {sixStarData.result.law.name} */}
          </span>
          <span className={styles.score}>
            <span>{sixStarData.result.law.score}</span>
            分
          </span>
          { <span className={styles.data}>(超过<span>70%</span>企业)</span> }
        </div>
        <div className={styles.text}>
          {sixStarData.result.law.description}
        </div>
      </div>
    );
  }
  // 团队相关
  let team = '';
  if (sixStarData && sixStarData.result.team) {
    team = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img5}/>
          <span className={styles.type}>
            {sixStarData.result.team.name}
          </span>
          <span className={styles.score}>
            <span>{sixStarData.result.team.score}</span>
            分
          </span>
          {<span className={styles.data}>(超过<span>70%</span>企业)</span> }
        </div>
        <div className={styles.text}>
          {sixStarData.result.team.description}
        </div>
      </div>
    );
  }
  // 社会影响力
  let influence = '';
  if (sixStarData && sixStarData.result.influence) {
    influence = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img6}/>
          <span className={styles.type}>
            {sixStarData.result.influence.name}
          </span>
          <span className={styles.score}>
            <span>{sixStarData.result.influence.score}</span>
            分
          </span>
          {<span className={styles.data}>(超过<span>70%</span>企业)</span> }
        </div>
        <div className={styles.text}>
          {sixStarData.result.influence.description}
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
