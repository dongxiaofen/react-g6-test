import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import TableList from './TableList';
import styles from './TableList/index.less';
import CompanyScore from './CompanyScore';
import Popover from 'antd/lib/popover';

function AlertAnalysis({alertAnalysisStore, uiStore}) {
  const len = uiStore.uiState.alertAnalysis.totalElements;
  const textOperation = (
    <div className={styles.wrapPop}>
      <div>
        <div className={styles.top1}>经营状况</div>
        <div className={styles.textPop}>
          根据经营年限、注册资本、中标次数、中标总金额等企业经营指标综合计算，评估该企业持续健康稳健发展的可能性。
        </div>
      </div>
      <div>
        <div className={styles.top}>行业相关</div>
        <div className={styles.textPop}>
          根据企业规模、所属行业，关联企业行业情况以及政府对企业所属行业的政策倾向等情况综合计算，评估企业所属行业的健康发展趋势。
        </div>
      </div>
      <div>
        <div className={styles.top}>创新能力</div>
        <div className={styles.textPop}>
          根据企业专利、商标申请发布数量和频率以及员工学历等情况综合计算，评估该企业的潜在创新能力。
        </div>
      </div>
      <div>
        <div className={styles.top}>合规程度</div>
        <div className={styles.textPop}>
          根据法院等司法机构给出的关于该企业的失信被执行记录、银行等金融机构对该企业的起诉情况以及企业作为被告的特殊案件记录、关联公司的涉诉情况来综合评估该企业的合规程度。
        </div>
      </div>
      <div>
        <div className={styles.top}>团队相关</div>
        <div className={styles.textPop}>
          根据企业高管职位的变化情况、业务区域的扩展情况、负面新闻信息的披露情况(如是否有涉及拖欠工资、高管跑路等新闻)以及企业的团队规模、薪资多少等指标综合计算，评估企业的团队成长健康度。
        </div>
      </div>
      <div>
        <div className={styles.top}>社会影响力</div>
        <div className={styles.textPop}>
          根据该企业的新闻曝光频率、媒体综合影响力大小（包括负面新闻多少和媒体本身影响力）、关联公司总数量多少以及企业的招聘口碑好坏等情况来综合计算，评估该企业对社会的影响程度。
        </div>
      </div>
    </div>
  );
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <span className={styles.titleText}>企业综合评分</span>
        <Popover placement="topLeft" content={textOperation}>
          <i className={styles.icon}></i>
        </Popover>
      </div>
      <CompanyScore alertAnalysisStore={alertAnalysisStore} />
      <ModuleTitle module="预警信息" count={len} />
      <TableList alertAnalysisStore={alertAnalysisStore} />
    </div>
  );
}

AlertAnalysis.propTypes = {
  foo: PropTypes.string,
};
export default inject('alertAnalysisStore', 'uiStore')(observer(AlertAnalysis));
