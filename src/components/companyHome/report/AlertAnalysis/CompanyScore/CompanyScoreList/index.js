import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CompanyScoreList({}) {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        该企业综合评分<span>98</span>超过同行业同地区<span>60%</span>企业
      </div>
      <div className={styles.content}>
        <div className={styles.single}>
          <div className={styles.top}>
            <i className={styles.img1}></i>
            <span className={styles.type}>经营状况</span>
            <span className={styles.data}>超过<span>70%</span>企业</span>
          </div>
          <div className={styles.text}>
            其中2017年纳税信息反映其营业收入连续两年维持正增长其中2017年纳税信息反映其营业收入连续两年维持正增长其中2017年纳税信息反映其营业收入连续两年维持正增长其中2017年纳税信息反映其营业收入连续两年维持正增长
          </div>
        </div>
        <div className={styles.single}>
          <div className={styles.top}>
            <i className={styles.img2}></i>
            <span className={styles.type}>行业维度</span>
            <span className={styles.data}>超过<span>70%</span>企业</span>
          </div>
          <div className={styles.text}>
            其中2017年纳税信息反映其营业收入连续两年维持正增长，经营状良好
          </div>
        </div>
        <div className={styles.single}>
          <div className={styles.top}>
            <i className={styles.img3}></i>
            <span className={styles.type}>创新能力</span>
            <span className={styles.data}>超过<span>70%</span>企业</span>
          </div>
          <div className={styles.text}>
            其中2017年纳税信息反映其营业收入连续两年维持正增长，经营状良好
          </div>
        </div>
        <div className={styles.single}>
          <div className={styles.top}>
            <i className={styles.img4}></i>
            <span className={styles.type}>负面相关</span>
            <span className={styles.data}>超过<span>70%</span>企业</span>
          </div>
          <div className={styles.text}>
            其中2017年纳税信息反映其营业收入连续两年维持正增长，经营状良好
          </div>
        </div>
        <div className={styles.single}>
          <div className={styles.top}>
            <i className={styles.img5}></i>
            <span className={styles.type}>团队相关</span>
            <span className={styles.data}>超过<span>70%</span>企业</span>
          </div>
          <div className={styles.text}>
            其中2017年纳税信息反映其营业收入连续两年维持正增长，经营状良好
          </div>
        </div>
        <div className={styles.single}>
          <div className={styles.top}>
            <i className={styles.img6}></i>
            <span className={styles.type}>社会影响力</span>
            <span className={styles.data}>超过<span>70%</span>企业</span>
          </div>
          <div className={styles.text}>
            其中2017年纳税信息反映其营业收入连续两年维持正增长，经营状良好
          </div>
        </div>
      </div>
    </div>
  );
}

CompanyScoreList.propTypes = {
  alertAnalysisStore: PropTypes.object,
};
export default observer(CompanyScoreList);
