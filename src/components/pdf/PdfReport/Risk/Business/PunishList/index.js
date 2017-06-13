import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import styles from './index.less';


function PunishList({moduleData}) {
  if (!moduleData || Object.keys(moduleData.result).length > 0) {
    return (
      <div>
        <div style={{height: '30px'}}></div>
        <PdfNotFound />
      </div>
    );
  }
  // 综合评分
  let allInfo = '';
  if (moduleData && moduleData.result.allInfo) {
    allInfo = (
      <div className={styles.title}>
        该企业综合评分
        <span className={styles.blueFonts}>
          {moduleData.result.allInfo.score ? moduleData.result.allInfo.score : '0'}
        </span>
        分
        {<span className={styles.data}>超过同行业同地区<span className={styles.blueFonts}>70%</span>企业</span>}
      </div>
    );
  }
  // 经营状况
  let operation = '';
  if (moduleData && moduleData.result.operation) {
    operation = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img1}/>
          <span className={styles.type}>
            {moduleData.result.operation.name}
          </span>
          <span className={styles.score}>
            <span>{moduleData.result.operation.score}</span>
            分
          </span>
          {<span className={styles.data}>(超过<span>70%</span>企业)</span>}
        </div>
        <div className={styles.text}>
          {moduleData.result.operation.description}
        </div>
      </div>
    );
  }
  // 行业相关
  let industry = '';
  if (moduleData && moduleData.result.industry) {
    industry = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img2}/>
          <span className={styles.type}>
            {moduleData.result.industry.name}
          </span>
          <span className={styles.score}>
            <span>{moduleData.result.industry.score}</span>
            分
          </span>
          { <span className={styles.data}>(超过<span>70%</span>企业)</span>}
        </div>
        <div className={styles.text}>
          {moduleData.result.industry.description}
        </div>
      </div>
    );
  }
  // 创新能力
  let creativity = '';
  if (moduleData && moduleData.result.creativity) {
    creativity = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img3}/>
          <span className={styles.type}>
            {moduleData.result.creativity.name}
          </span>
          <span className={styles.score}>
            <span>{moduleData.result.creativity.score}</span>
            分
          </span>
          { <span className={styles.data}>(超过<span>70%</span>企业)</span>}
        </div>
        <div className={styles.text}>
          {moduleData.result.creativity.description}
        </div>
      </div>
    );
  }
  // 法务相关
  let law = '';
  if (moduleData && moduleData.result.law) {
    law = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img4}></i>
          <span className={styles.type}>
            合规程度
            {/* {moduleData.result.law.name} */}
          </span>
          <span className={styles.score}>
            <span>{moduleData.result.law.score}</span>
            分
          </span>
          { <span className={styles.data}>(超过<span>70%</span>企业)</span> }
        </div>
        <div className={styles.text}>
          {moduleData.result.law.description}
        </div>
      </div>
    );
  }
  // 团队相关
  let team = '';
  if (moduleData && moduleData.result.team) {
    team = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img5}/>
          <span className={styles.type}>
            {moduleData.result.team.name}
          </span>
          <span className={styles.score}>
            <span>{moduleData.result.team.score}</span>
            分
          </span>
          {<span className={styles.data}>(超过<span>70%</span>企业)</span> }
        </div>
        <div className={styles.text}>
          {moduleData.result.team.description}
        </div>
      </div>
    );
  }
  // 社会影响力
  let influence = '';
  if (moduleData && moduleData.result.influence) {
    influence = (
      <div className={styles.single}>
        <div className={styles.top}>
          <i className={styles.img6}/>
          <span className={styles.type}>
            {moduleData.result.influence.name}
          </span>
          <span className={styles.score}>
            <span>{moduleData.result.influence.score}</span>
            分
          </span>
          {<span className={styles.data}>(超过<span>70%</span>企业)</span> }
        </div>
        <div className={styles.text}>
          {moduleData.result.influence.description}
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

PunishList.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(PunishList);
