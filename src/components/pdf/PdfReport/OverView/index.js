import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import PdfTitle from 'components/common/pdf/PdfTitle';
import SecondTitle from 'components/common/pdf/SecondTitle';
import styles from './index.less';
import Summary from './Summary';
import pathval from 'pathval';

function OverView({ pdfStore, clientStore, routing }) {
  const summaryData = pdfStore.summary ? pdfStore.summary : '';
  const isStock = pathval.getPathValue(pdfStore, 'banner.stockCode');
  const monitorId = routing.location.query.monitorId;
  const corpBasicMap = {
    mapKey: {
      registerInfo: '注册信息',
      shareholder: '股东',
      mainPerson: '主要人员',
      branch: '分支机构'
    },
    title: '工商基本信息',
    valueData: summaryData.basic ? {data: summaryData.basic.corpBasic, type: 'object'} : undefined
  };
  const investPositionMap = {
    mapKey: {
      enterprise: '企业对外投资',
      frInvest: '法人对外投资',
      frPosition: '法人对外任职',
    },
    title: '对外投资任职',
    valueData: summaryData.basic ? {data: summaryData.basic.investPosition, type: 'object'} : undefined,
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
    title: '纳税信用',
    valueData: summaryData.riskInfo ? {data: summaryData.riskInfo.taxNotice, type: 'number'} : undefined,
  };
  const corpNoticeMap = {
    mapKey: {
      abnormalOperation: '经营异常信息',
      checkMessage: '抽查检查信息'
    },
    title: '工商公示信息',
    valueData: summaryData.riskInfo ? {data: summaryData.riskInfo.corpNotice, type: 'object'} : undefined,
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
  const linkRelationshipMap = {
    mapKey: {
      linkRelationship: '关联图信息'
    },
    title: '关联关系',
    valueData: summaryData.network ? {data: summaryData.network, type: 'object'} : undefined,
  };
  const recruitmentEmployeeMap = {
    mapKey: {
      avgSalary: '招聘平均薪资',
      education: '招聘学历要求',
      graduation: '员工背景－毕业学校',
      job: '招聘岗位分布',
      major: '员工背景－所学专业',
      position: '近期招聘岗位'
    },
    title: '招聘/员工背景',
    valueData: summaryData.team ? {data: summaryData.team.recruitmentEmployee, type: 'object'} : undefined,
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
  return (
    <div>
      <PdfTitle module="信息概览" subModule="" />
      <SecondTitle module="企业基本信息" />
      <hr className={styles.hrhr} />
      <Summary {...corpBasicMap} />
      <Summary {...investPositionMap} />
      <Summary {...businessChange} />
      <Summary {...yearReport} />
      {
        isStock ?
          [
            <div key="thisIsSecondTitleObject">
              <SecondTitle module="上市披露" />,
              <hr className={styles.hrhr} />,
              <Summary {...companySummary}/>,
              <Summary {...companyAnnouncement} />
            </div>
          ]
          : ''
      }
      <SecondTitle module="风险信息" />
      <hr className={styles.hrhr} />
      <Summary {...courtMap} />
      <Summary {...taxInfoMap} />
      <Summary {...corpNoticeMap} />
      <SecondTitle module="新闻舆情" />
      <hr className={styles.hrhr} />
      <Summary {...newsContent} />
      <SecondTitle module="经营信息" />
      <hr className={styles.hrhr} />
      {
        clientStore.envConfig.indexOf('dianxin') !== -1 ?
          <Summary {...telMap} />
          :
          ''
      }
      <Summary {...operationInfoMap}/>
      <SecondTitle module="关联网络" />
      <hr className={styles.hrhr} />
      <Summary {...linkRelationshipMap} />
      <Summary {...riskRelationshipMap} />
      <SecondTitle module="团队信息" />
      <hr className={styles.hrhr} />
      <Summary {...recruitmentEmployeeMap} />
      {
        monitorId ? <Summary {...recruitmentResumeMap} /> : null
      }
    </div>
  );
}

OverView.propTypes = {
  pdfStore: PropTypes.object,
  clientStore: PropTypes.object,
  routing: PropTypes.object,
};
export default inject('clientStore', 'pdfStore', 'routing')(observer(OverView));
