import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanyScoreList({sixStarData}) {
  // 综合评分
  let allInfo = '';
  if (sixStarData && sixStarData.allInfo) {
    allInfo = (
      <div className={styles.title}>
        该企业综合评分
        <span>
          {sixStarData.allInfo.score ? sixStarData.allInfo.score : '0'}
        </span>
        分
        {/* &nbsp;&nbsp;超过同行业同地区
        <span>60%</span>
        企业 */}
      </div>
    );
  }
  // 经营状况
  let operation = '';
  if (sixStarData && sixStarData.operation) {
    operation = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img1}></i>
          <span className={styles.type}>
            {sixStarData.operation.name}
          </span>
          <span className={styles.score}>
            <span>{sixStarData.operation.score}</span>
            分
          </span>
          {/* <span className={styles.data}>超过<span>70%</span>企业</span> */}
        </div>
        <div className={styles.text}>
          {sixStarData.operation.description}
        </div>
      </div>
    );
  }
  // 行业相关
  let industry = '';
  if (sixStarData && sixStarData.industry) {
    industry = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img2}></i>
          <span className={styles.type}>
            {sixStarData.industry.name}
          </span>
          <span className={styles.score}>
            <span>{sixStarData.industry.score}</span>
            分
          </span>
          {/* <span className={styles.data}>超过<span>70%</span>企业</span> */}
        </div>
        <div className={styles.text}>
          {sixStarData.industry.description}
        </div>
      </div>
    );
  }
  // 创新能力
  let creativity = '';
  if (sixStarData && sixStarData.creativity) {
    creativity = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img3}></i>
          <span className={styles.type}>
            {sixStarData.creativity.name}
          </span>
          <span className={styles.score}>
            <span>{sixStarData.creativity.score}</span>
            分
          </span>
          {/* <span className={styles.data}>超过<span>70%</span>企业</span> */}
        </div>
        <div className={styles.text}>
          {sixStarData.creativity.description}
        </div>
      </div>
    );
  }
  // 法务相关
  let law = '';
  if (sixStarData && sixStarData.law) {
    law = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img4}></i>
          <span className={styles.type}>
            合规程度
            {/* {sixStarData.law.name} */}
          </span>
          <span className={styles.score}>
            <span>{sixStarData.law.score}</span>
            分
          </span>
          {/* <span className={styles.data}>超过<span>70%</span>企业</span> */}
        </div>
        <div className={styles.text}>
          {sixStarData.law.description}
        </div>
      </div>
    );
  }
  // 团队相关
  let team = '';
  if (sixStarData && sixStarData.team) {
    team = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img5}></i>
          <span className={styles.type}>
            {sixStarData.team.name}
          </span>
          <span className={styles.score}>
            <span>{sixStarData.team.score}</span>
            分
          </span>
          {/* <span className={styles.data}>超过<span>70%</span>企业</span> */}
        </div>
        <div className={styles.text}>
          {sixStarData.team.description}
        </div>
      </div>
    );
  }
  // 社会影响力
  let influence = '';
  if (sixStarData && sixStarData.influence) {
    influence = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img6}></i>
          <span className={styles.type}>
            {sixStarData.influence.name}
          </span>
          <span className={styles.score}>
            <span>{sixStarData.influence.score}</span>
            分
          </span>
          {/* <span className={styles.data}>超过<span>70%</span>企业</span> */}
        </div>
        <div className={styles.text}>
          {sixStarData.influence.description}
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
