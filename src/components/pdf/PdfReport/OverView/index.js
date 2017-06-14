import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import PdfTitle from 'components/common/pdf/PdfTitle';
import SecondTitle from 'components/common/pdf/SecondTitle';
import styles from './index.less';
import Summary from './Summary';
import pathval from 'pathval';

function OverView({ pdfStore, clientStore }) {
  const summaryData = pdfStore.summary ? pdfStore.summary : '';
  const isStock = pathval.getPathValue(pdfStore, 'banner.stockCode');
  const objectPase = (data, type) => {
    let newArr = [];
    Object.keys(data).map( (key) => {
      if (type === 'operation') {
        newArr = [...newArr, `${key}（${data[key] - 2}）`];
      } else {
        newArr = [...newArr, `${key}（${data[key]}）`];
      }
    });
    return newArr.join('，');
  };

  const corpBasicMap = {
    mapKey: {
      registerInfo: '注册信息',
      shareholder: '股东',
      mainPerson: '主要人员',
      branch: '分支机构'
    },
    title: '照面信息',
    valueData: summaryData.basic ? {data: summaryData.basic.corpBasic, type: 'object'} : undefined
  };
  const entinvItem = {
    title: '企业对外投资',
    valueData: summaryData.basic ? {data: summaryData.invPos.entinvItemCount, type: 'number'} : undefined,
    unit: '家'
  };
  const investPositionMap = {
    mapKey: {
      frinvCount: '法人对外投资',
      frPositionCount: '法人对外任职',
    },
    title: '法人对外投资任职',
    valueData: summaryData.basic ? {data: summaryData.invPos, type: 'object'} : undefined,
  };
  const investManagement = {
    mapKey: {
      managementFrPositionCount: '董监高对外担任法人',
      managementInvCount: '董监高对外投资',
      managementPositionCount: '董监高对外任职',
    },
    title: '董监高对外投资任职',
    valueData: summaryData.basic ? {data: summaryData.invPos, type: 'object'} : undefined,
  };
  const businessChange = {
    title: '工商变更',
    valueData: summaryData.basic ? {data: summaryData.basic.corpAlter, type: 'number'} : undefined,
  };
  const yearReport = {
    title: '企业年报',
    unit: '份',
    valueData: summaryData.basic ? {data: summaryData.basic.yearReport, type: 'number'} : undefined
  };
  const companySummary = {
    mapKey: {
      summary: '公司概括',
      shareholder: '十大股东',
      circulateShareHolder: '流通股东',
      management: '高管'
    },
    title: '公司概括',
    valueData: summaryData.stock ? {data: summaryData.stock.info, type: 'object'} : undefined,
  };
  const companyAnnouncement = {
    title: '公司公告',
    valueData: summaryData.stock ? {data: summaryData.stock.stockAnnouncement, type: 'number'} : undefined,
  };
  const courtMap = {
    mapKey: {
      announcement: '法院公告',
      dishonesty: '失信被执行人信息',
      executed: '被执行人信息',
      judgeDoc: '判决文书',
      litigation: '涉诉资产',
      notice: '开庭公告'
    },
    title: '法务信息',
    valueData: summaryData.riskInfo ? {data: summaryData.riskInfo.court, type: 'object'} : undefined,
  };
  const taxInfoMap = {
    title: '纳税公告',
    valueData: summaryData.riskInfo ? {data: summaryData.riskInfo.taxNotice, type: 'number'} : undefined,
  };
  const corpNoticeMap = {
    mapKey: {
      abnormalOperation: '经营异常信息',
      checkMessage: '抽查检查信息',
      illegal: '违法记录'
    },
    title: '工商抽查',
    valueData: summaryData.riskInfo ? {data: summaryData.riskInfo.corpCheck, type: 'object'} : undefined,
  };
  const newsContent = {
    title: '新闻内容',
    valueData: summaryData.news ? {data: summaryData.news.dataCount, type: 'number'} : undefined,
  };
  const telMap = {
    mapKey: {
      basicScale: '基础设施规模',
      resume: '综合消费情况',
      stability: '企业稳定性'
    },
    title: '企业综合信息',
    valueData: summaryData.operation ? {data: summaryData.operation.tel, type: 'object'} : undefined,
  };
  const operationInfoMap = {
    mapKey: {
      bidding: '招投标信息',
      trademark: '商标',
      patent: '专利'
    },
    title: '无形资产/招投标',
    valueData: summaryData.operation ? {data: summaryData.operation.operationInfo, type: 'object'} : undefined,
  };
  const riskRelationshipMap = {
    mapKey: {
      riskRelationship: '风险关联信息'
    },
    title: '风险关系',
    valueData: summaryData.network ? {data: summaryData.network, type: 'object'} : undefined,
  };
  const pledgeEquity = {
    mapKey: {
      sharesFrostCount: '股权冻结',
      sharesImpawnCount: '股权质押',
      sharesTransferCount: '股权转让',
    },
    title: '股权相关',
    valueData: summaryData.network ? {data: summaryData.pledgeEquity, type: 'object'} : undefined,
  };
  const recruitmentEmployee = {
    mapKey: {
      job: '招聘岗位分布',
      education: '招聘学历要求',
      avgSalary: '招聘平均薪资',
    },
    title: '招聘信息',
    valueData: summaryData.team ? {data: summaryData.team.recruitmentEmployee, type: 'object'} : undefined,
  };
  const staffBackground = {
    mapKey: {
      major: '毕业学校',
      graduation: '所学专业',
    },
    title: '员工背景',
    valueData: summaryData.team ? {data: summaryData.team.recruitmentEmployee, type: 'object'} : undefined,
  };
  const staffPosition = {
    mapKey: {
      position: '近期招聘岗位',
    },
    unit: '个',
    title: '近期招聘岗位',
    valueData: summaryData.team ? {data: summaryData.team.recruitmentEmployee.position, type: 'number'} : undefined,
  };
  const recruitmentResumeMap = {
    mapKey: {
      recruitmentLocation: '新增招聘地点',
      avgSalaryTrend: '平均薪资趋势',
      recruitmentPost: '新增招聘岗位',
      resumeTrend: '离职意向趋势'
    },
    title: '团队监控分析',
    valueData: summaryData.team ? { data: summaryData.team.recruitmentResume, type: 'object' } : undefined,
  };
  // 多维分析
  const comprehensiveAnalysis = {
    mapKey: {
      allScore: '综合评分',
      operationScore: '经营状况',
      industryScore: '行业相关',
      creativityScore: '创新能力',
      lawScore: '法务相关',
      teamScore: '团队相关',
      influenceScore: '社会影响力'
    },
    unit: '分',
    title: '多维综合分析',
    valueData: summaryData.scoreStatistic ? {data: summaryData.scoreStatistic, type: 'object'} : undefined
  };
  const profitabilityAnalysis = {
    title: '盈利能力分析',
    valueData: {type: 'none', data: (summaryData.profitStatistic && Object.keys(summaryData.profitStatistic).length > 0 ? objectPase(summaryData.profitStatistic) : '暂无信息')},
  };
  const operationalAnalysis = {
    title: '营运能力分析',
    valueData: {type: 'none', data: (summaryData.operationStatistic && Object.keys(summaryData.operationStatistic).length > 0 ? objectPase(summaryData.operationStatistic, 'operation') : '暂无信息')},
  };
  const growthAnalysis = {
    title: '成长能力分析',
    valueData: {type: 'none', data: (summaryData.growingStatistic && Object.keys(summaryData.growingStatistic).length > 0 ? objectPase(summaryData.growingStatistic) : '暂无信息')},
  };
  return (
    <div>
      <PdfTitle module="信息概览" subModule="" />
      <SecondTitle module="工商信息" />
      <hr className={styles.hrhr} />
      <Summary {...corpBasicMap} />
      <Summary {...yearReport} />
      <Summary {...businessChange} />

      <SecondTitle module="对外投资任职" />
      <hr className={styles.hrhr} />
      <Summary {...entinvItem} />
      <Summary {...investPositionMap} />
      <Summary {...investManagement} />
      {
        isStock ?
            <div key="thisIsSecondTitleObject">
              <SecondTitle module="上市披露" />
              <hr className={styles.hrhr} />
              <Summary {...companySummary}/>
              <Summary {...companyAnnouncement} />
            </div>
          : ''
      }
      <SecondTitle module="新闻信息" />
      <hr className={styles.hrhr} />
      <Summary {...newsContent} />
      {
        clientStore.envConfig.indexOf('dianxin') !== -1 ?
          <div>
            <SecondTitle module="经营信息" />
            <hr className={styles.hrhr} />
            <Summary {...telMap} />
          </div>
          :
          ''
      }
      <SecondTitle module="经营信息" />
      <hr className={styles.hrhr} />
      <Summary {...operationInfoMap} />

      <SecondTitle module="团队信息" />
      <hr className={styles.hrhr} />
      <Summary {...recruitmentEmployee} />
      <Summary {...staffBackground} />
      <Summary {...staffPosition} />
      {
        pdfStore.banner.mainStatus === 'MONITOR' ?
          <Summary {...recruitmentResumeMap} /> : ''
      }

      <SecondTitle module="风险信息" />
      <hr className={styles.hrhr} />
      <Summary {...taxInfoMap} />
      <Summary {...courtMap} />
      <Summary {...corpNoticeMap} />

      <SecondTitle module="抵质押信息" />
      <hr className={styles.hrhr} />
      <Summary {...pledgeEquity} />
      <SecondTitle module="关联图信息" />
      <hr className={styles.hrhr} />
      <Summary {...riskRelationshipMap} />

      {/* 多维分析 */}
            <div>
              <SecondTitle module="多维综合分析" />
              <hr className={styles.hrhr} />
              <Summary {...comprehensiveAnalysis} />
            </div>
            <div>
              <SecondTitle module="盈利能力分析" />
              <hr className={styles.hrhr} />
              <Summary {...profitabilityAnalysis} />
            </div>
            <div>
              <SecondTitle module="营运能力分析" />
              <hr className={styles.hrhr} />
              <Summary {...operationalAnalysis}/>
            </div>
            <div>
              <SecondTitle module="成长能力分析" />
              <hr className={styles.hrhr} />
              <Summary {...growthAnalysis}/>
            </div>
    </div>
  );
}

OverView.propTypes = {
  pdfStore: PropTypes.object,
  clientStore: PropTypes.object,
  routing: PropTypes.object,
};
export default inject('clientStore', 'pdfStore')(observer(OverView));
