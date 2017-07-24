import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import PdfNotFound from 'components/common/pdf/PdfNotFound';
import styles from './index.less';

function ComprehensiveAnalysis({moduleData}) {
  // 综合评分
  let allInfo = '';
  const data = moduleData;
  if (data && data.result && data.result.allInfo) {
    let scaleText = '';
    if (data.result.allInfo.comparison > 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>92%</span>企业
        </span>
      );
    } else if (data.result.allInfo.comparison >= 90 && data.result.allInfo.comparison <= 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>90%</span>企业
        </span>
      );
    } else if (data.result.allInfo.comparison > 5 && data.result.allInfo.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>10%</span>企业
        </span>
      );
    } else if (data.result.allInfo.comparison >= 0 && data.result.allInfo.comparison <= 5) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>8%</span>企业
        </span>
      );
    } else {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>{data.result.allInfo.comparison ? data.result.allInfo.comparison : 0}%</span>企业
        </span>
      );
    }
    allInfo = (
      <div className={styles.title}>
        该企业综合评分
        <span className={styles.blueFonts}>
          {data.result.allInfo.score ? data.result.allInfo.score : '0'}
        </span>
        分
        <span className={styles.data}>
          {scaleText}
          {/* 超过同行业同地区
           <span
           className={styles.blueFonts}>
           {data.result.allInfo.comparison ? data.result.allInfo.comparison : 0}%
           </span>
           企业 */}
        </span>
      </div>
    );
  }
  // 经营状况
  let operation = '';
  if (data && data.result && data.result.operation) {
    let scaleText = '';
    if (data.result.operation.comparison > 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>92%</span>企业
        </span>
      );
    } else if (data.result.operation.comparison >= 90 && data.result.operation.comparison <= 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>90%</span>企业
        </span>
      );
    } else if (data.result.operation.comparison > 5 && data.result.operation.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>10%</span>企业
        </span>
      );
    } else if (data.result.operation.comparison >= 0 && data.result.operation.comparison <= 5) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>8%</span>企业
        </span>
      );
    } else {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>{data.result.operation.comparison ? data.result.operation.comparison : 0}%</span>企业
        </span>
      );
    }
    operation = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img1} />
          <span className={styles.type}>
            {data.result.operation.name}
          </span>
          <span className={styles.score}>
            <span>{data.result.operation.score}</span>
            分
          </span>
          <span className={styles.data}>
            {scaleText}
          </span>
        </div>
        <div className={styles.text}>
          {data.result.operation.description}
        </div>
      </div>
    );
  }
  // 行业相关
  let industry = '';
  if (data && data.result && data.result.industry) {
    let scaleText = '';
    if (data.result.industry.comparison > 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>92%</span>企业
        </span>
      );
    } else if (data.result.industry.comparison >= 90 && data.result.industry.comparison <= 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>90%</span>企业
        </span>
      );
    } else if (data.result.industry.comparison > 5 && data.result.industry.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>10%</span>企业
        </span>
      );
    } else if (data.result.industry.comparison >= 0 && data.result.industry.comparison <= 5) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>8%</span>企业
        </span>
      );
    } else {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>{data.result.industry.comparison ? data.result.industry.comparison : 0}%</span>企业
        </span>
      );
    }
    industry = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img2} />
          <span className={styles.type}>
            {data.result.industry.name}
          </span>
          <span className={styles.score}>
            <span>{data.result.industry.score}</span>
            分
          </span>
          <span className={styles.data}>
            {scaleText}
          </span>
        </div>
        <div className={styles.text}>
          {data.result.industry.description}
        </div>
      </div>
    );
  }
  // 创新能力
  let creativity = '';
  if (data && data.result && data.result.creativity) {
    let scaleText = '';
    if (data.result.creativity.comparison > 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>92%</span>企业
        </span>
      );
    } else if (data.result.creativity.comparison >= 90 && data.result.creativity.comparison <= 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>90%</span>企业
        </span>
      );
    } else if (data.result.creativity.comparison > 5 && data.result.creativity.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>10%</span>企业
        </span>
      );
    } else if (data.result.creativity.comparison >= 0 && data.result.creativity.comparison <= 5) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>8%</span>企业
        </span>
      );
    } else {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>{data.result.creativity.comparison ? data.result.creativity.comparison : 0}%</span>企业
        </span>
      );
    }
    creativity = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img3} />
          <span className={styles.type}>
            {data.result.creativity.name}
          </span>
          <span className={styles.score}>
            <span>{data.result.creativity.score}</span>
            分
          </span>
          <span className={styles.data}>
            {scaleText}
          </span>
        </div>
        <div className={styles.text}>
          {data.result.creativity.description}
        </div>
      </div>
    );
  }
  // 法务相关
  let law = '';
  if (data && data.result && data.result.law) {
    let scaleText = '';
    if (data.result.law.comparison > 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>92%</span>企业
        </span>
      );
    } else if (data.result.law.comparison >= 90 && data.result.law.comparison <= 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>90%</span>企业
        </span>
      );
    } else if (data.result.law.comparison > 5 && data.result.law.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>10%</span>企业
        </span>
      );
    } else if (data.result.law.comparison >= 0 && data.result.law.comparison <= 5) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>8%</span>企业
        </span>
      );
    } else {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>{data.result.law.comparison ? data.result.law.comparison : 0}%</span>企业
        </span>
      );
    }
    law = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img4}></i>
          <span className={styles.type}>
            合规程度
            {/* { data.result.law.name} */}
          </span>
          <span className={styles.score}>
            <span>{data.result.law.score}</span>
            分
          </span>
          <span className={styles.data}>
            {scaleText}
          </span>
        </div>
        <div className={styles.text}>
          {data.result.law.description}
        </div>
      </div>
    );
  }
  // 团队相关
  let team = '';
  if (data && data.result && data.result.team) {
    let scaleText = '';
    if (data.result.team.comparison > 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>92%</span>企业
        </span>
      );
    } else if (data.result.team.comparison >= 90 && data.result.team.comparison <= 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>90%</span>企业
        </span>
      );
    } else if (data.result.team.comparison > 5 && data.result.team.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>10%</span>企业
        </span>
      );
    } else if (data.result.team.comparison >= 0 && data.result.team.comparison <= 5) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>8%</span>企业
        </span>
      );
    } else {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>{data.result.team.comparison ? data.result.team.comparison : 0}%</span>企业
        </span>
      );
    }
    team = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img5} />
          <span className={styles.type}>
            {data.result.team.name}
          </span>
          <span className={styles.score}>
            <span>{data.result.team.score}</span>
            分
          </span>
          <span className={styles.data}>
            {scaleText}
          </span>
        </div>
        <div className={styles.text}>
          {data.result.team.description}
        </div>
      </div>
    );
  }
  // 社会影响力
  let influence = '';
  if (data && data.result && data.result.influence) {
    let scaleText = '';
    if (data.result.influence.comparison > 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>92%</span>企业
        </span>
      );
    } else if (data.result.influence.comparison >= 90 && data.result.influence.comparison <= 95) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>90%</span>企业
        </span>
      );
    } else if (data.result.influence.comparison > 5 && data.result.influence.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>10%</span>企业
        </span>
      );
    } else if (data.result.influence.comparison >= 0 && data.result.influence.comparison <= 5) {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>8%</span>企业
        </span>
      );
    } else {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>{data.result.influence.comparison ? data.result.influence.comparison : 0}%</span>企业
        </span>
      );
    }
    influence = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img6} />
          <span className={styles.type}>
            {data.result.influence.name}
          </span>
          <span className={styles.score}>
            <span>{data.result.influence.score}</span>
            分
          </span>
          <span className={styles.data}>
            {scaleText}
          </span>
        </div>
        <div className={styles.text}>
          {data.result.influence.description}
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

ComprehensiveAnalysis.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(ComprehensiveAnalysis);
