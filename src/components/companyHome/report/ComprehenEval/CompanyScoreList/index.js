import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'antd/lib/popover';

function CompanyScoreList({ sixStarData }) {
  // 综合评分
  let allInfo = '';
  const data = sixStarData.data;
  if (data && data.result && data.result.allInfo) {
    let scaleText = '';
    if (data.result.allInfo.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对落后</span>
        </span>
      );
    } else if (data.result.allInfo.comparison >= 90) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对领先</span>
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
    if (data.result.operation.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对落后</span>
        </span>
      );
    } else if (data.result.operation.comparison >= 90) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对领先</span>
        </span>
      );
    } else {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>{data.result.operation.comparison ? data.result.operation.comparison : 0}%</span>企业
        </span>
      );
    }
    const explain = (
      <div className={styles.explainContent}>
        根据经营年限、注册资本、中标次数、中标总金额等企业经营指标综合计算，评估该企业持续健康稳健发展的可能性。
      </div>
    );
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
          <Popover placement="topRight" trigger="hover" content={explain}>
            <span className={styles.explain}>说明</span>
          </Popover>
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
    if (data.result.industry.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对落后</span>
        </span>
      );
    } else if (data.result.industry.comparison >= 90) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对领先</span>
        </span>
      );
    } else {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>{data.result.industry.comparison ? data.result.industry.comparison : 0}%</span>企业
        </span>
      );
    }
    const explain = (
      <div className={styles.explainContent}>
        根据企业规模、所属行业，关联企业行业情况以及政府对企业所属行业的政策倾向等情况综合计算，评估企业所属行业的健康发展趋势。
      </div>
    );
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
          <Popover placement="topRight" trigger="hover" content={explain}>
            <span className={styles.explain}>说明</span>
          </Popover>
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
    if (data.result.creativity.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对落后</span>
        </span>
      );
    } else if (data.result.creativity.comparison >= 90) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对领先</span>
        </span>
      );
    } else {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>{data.result.creativity.comparison ? data.result.creativity.comparison : 0}%</span>企业
        </span>
      );
    }
    const explain = (
      <div className={styles.explainContent}>
        根据企业专利、商标申请发布数量和频率以及员工学历等情况综合计算，评估该企业的潜在创新能力。
      </div>
    );
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
          <Popover placement="topRight" trigger="hover" content={explain}>
            <span className={styles.explain}>说明</span>
          </Popover>
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
    if (data.result.law.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对落后</span>
        </span>
      );
    } else if (data.result.law.comparison >= 90) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对领先</span>
        </span>
      );
    } else {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>{data.result.law.comparison ? data.result.law.comparison : 0}%</span>企业
        </span>
      );
    }
    const explain = (
      <div className={styles.explainContent}>
        根据法院等司法机构给出的关于该企业的失信被执行记录、银行等金融机构对该企业的起诉情况以及企业作为被告的特殊案件记录、关联公司的涉诉情况来综合评估该企业的合规程度。
      </div>
    );
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
          <Popover placement="topRight" trigger="hover" content={explain}>
            <span className={styles.explain}>说明</span>
          </Popover>
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
    if (data.result.team.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对落后</span>
        </span>
      );
    } else if (data.result.team.comparison >= 90) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对领先</span>
        </span>
      );
    } else {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>{data.result.team.comparison ? data.result.team.comparison : 0}%</span>企业
        </span>
      );
    }
    const explain = (
      <div className={styles.explainContent}>
        根据企业高管职位的变化情况、业务区域的扩展情况、负面新闻信息的披露情况(如是否有涉及拖欠工资、高管跑路等新闻)以及企业的团队规模、薪资多少等指标综合计算，评估企业的团队成长健康度。
      </div>
    );
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
          <Popover placement="topRight" trigger="hover" content={explain}>
            <span className={styles.explain}>说明</span>
          </Popover>
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
    if (data.result.influence.comparison <= 10) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对落后</span>
        </span>
      );
    } else if (data.result.influence.comparison >= 90) {
      scaleText = (
        <span className={styles.scaleText}>
          在同行业同地区企业中
          <span>相对领先</span>
        </span>
      );
    } else {
      scaleText = (
        <span className={styles.scaleText}>
          超过同行业同地区<span>{data.result.influence.comparison ? data.result.influence.comparison : 0}%</span>企业
        </span>
      );
    }
    const explain = (
      <div className={styles.explainContent}>
        根据该企业的新闻曝光频率、媒体综合影响力大小（包括负面新闻多少和媒体本身影响力）、关联公司总数量多少以及企业的招聘口碑好坏等情况来综合计算，评估该企业对社会的影响程度。
      </div>
    );
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
          <Popover placement="topRight" trigger="hover" content={explain}>
            <span className={styles.explain}>说明</span>
          </Popover>
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

CompanyScoreList.propTypes = {
  alertAnalysisStore: PropTypes.object,
};
export default observer(CompanyScoreList);
