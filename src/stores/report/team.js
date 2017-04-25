import { observable, action } from 'mobx';
import { companyHomeApi } from 'api';
class TeamStore {
  isEmptyObject(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  @observable isLoading = true;
  @observable isMount = false;

  /* 招聘信息 */
  // 公司信息
  @observable companyInfo = {};
  // 企业招聘薪资比例
  @observable wage = [];
  // 招聘岗位分布
  @observable recruitment= [];

  @observable teamAnalysis = {};

  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get team data', (resp) => {
        const respData = resp.data;
        const recruitmentData = respData.recruitAndResumeResponse;
        if (recruitmentData && !this.isEmptyObject(recruitmentData) ) {
          const recruitmentStatistic = recruitmentData.recruitmentStatisticResponse;
          let salaryDis = recruitmentStatistic.salaryDis;

          const staffInfo = recruitmentData.resumeStatisticResponse;
          let staffSchool = staffInfo.schoolInfo;
          let staffSpe = staffInfo.majorInfo;

          let recruitmentInfoData = [];
          const recruitmentInfo = recruitmentData.recruitmentInfo;
          if (recruitmentInfo && !this.isEmptyObject(recruitmentInfo)) {
            recruitmentInfoData = recruitmentData.recruitmentInfo.data;
            if (recruitmentInfoData && recruitmentInfoData.length > 0) {
              recruitmentInfoData = recruitmentInfoData.forEach((item) => {
                const obj = {};
                obj.category = item.category;
                obj.salaryText = item.salaryText ? item.salaryText : '无';
                obj.address = item.address ? item.address : '无';
                obj.requireNum = item.requireNum ? item.requireNum : '无';
                obj.releaseTime = item.releaseTime ? item.releaseTime : '无';
                obj.sourceUrl = item.sourceUrl;
                return obj;
              });
            }
          }
          // 全国招聘薪资的平均数
          let similarCompanyAvgSalary = recruitmentStatistic.similarCompanyAvgSalary;
          if (similarCompanyAvgSalary) {
            similarCompanyAvgSalary = similarCompanyAvgSalary.toFixed(2);
          }

          // 招聘信息的第一块
          const degreeInfo = [];
          const companyInfo = {};
          const recruitmentInfoDegreeInfo = recruitmentStatistic.degreeInfo;
          if (recruitmentInfoDegreeInfo && recruitmentInfoDegreeInfo.length > 0) {
            recruitmentInfoDegreeInfo.forEach((item) => {
              degreeInfo.push(
                `${item.name} ( ${(item.value * 100).toFixed(0)}% ) `
              );
            });
          }
          companyInfo.scale = recruitmentStatistic.scale ? recruitmentStatistic.scale : '暂无信息';
          companyInfo.location = recruitmentStatistic.location.length ? recruitmentStatistic.location.join('，') : '暂无信息';
          companyInfo.salaryAvg = recruitmentStatistic.salaryAvg ? recruitmentStatistic.salaryAvg.toFixed(2) + '元' : '暂无信息';
          companyInfo.workingYearsAvg = recruitmentStatistic.workingYearsAvg ? recruitmentStatistic.workingYearsAvg.toFixed(2) + '年' : '暂无信息';
          companyInfo.degreeInfo = degreeInfo.length ? degreeInfo.join('，') : '暂无信息';

          // 全国同行业招聘薪资比例
          const recruitmentScale = [];
          if (salaryDis && salaryDis.length > 0) {
            salaryDis = salaryDis.sort((prve, next) => {
              return next - prve;
            });
            let salaryDisCount = 0;
            salaryDis.forEach((item, key) => {
              recruitmentScale.push({
                name: key,
                value: (item * 100).toFixed(2),
                itemStyle: {
                  normal: {
                    color: `rgba(67, 191, 119, ${1 - 0.2 * salaryDisCount})`
                  }
                }
              });
              salaryDisCount++;
            });
          }

          // 招聘岗位分布
          const recruitmentJobAxis = [];
          const recruitmentJobData = [];
          const categoryInfo = recruitmentStatistic.categoryInfo;
          if (categoryInfo && categoryInfo.length > 0) {
            recruitmentStatistic.categoryInfo.forEach((item) => {
              recruitmentJobAxis.push(item.name);
              recruitmentJobData.push((item.value * 100).toFixed(0));
            });
          }

          // 毕业学校
          const staffSchoolAxis = [];
          const staffSchoolData = [];
          if (staffSchool && staffSchool.length > 0) {
            staffSchool = staffSchool.sort((prev, next) => {
              return prev - next;
            });
            staffSchool.forEach((item, key) => {
              staffSchoolAxis.push(key);
              staffSchoolData.push(item);
            });
          }

          // 所学专业
          const staffSpeAxis = [];
          const staffSpeData = [];
          if (staffSpe && staffSpe.length > 0) {
            let staffSpeLength = 5;
            staffSpe = staffSpe.sort((prev, next) => {
              return next.value - prev.value;
            });
            if (staffSpe.length < 5) {
              staffSpeLength = staffSpe.length;
              staffSpe = staffSpe.reverse();
            } else {
              staffSpe = staffSpe.slice(0, 5).reverse();
            }
            for (let idx = 0; idx < staffSpeLength; idx++) {
              staffSpeAxis.push(staffSpe[idx].name);
              staffSpeData.push(staffSpe[idx].value);
            }
          }
          this.companyInfo = companyInfo;
        }
        this.isLoading = false;
      }));
  }
}
export default new TeamStore();
