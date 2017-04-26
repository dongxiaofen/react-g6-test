import { observable, action } from 'mobx';
import moment from 'moment';
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

  dealWithObjectToArray(obj) {
    const keys = Object.keys(obj);
    return keys.map((item) => {
      return {
        name: item,
        value: obj[item]
      };
    });
  }

  @observable isLoading = true;
  @observable isMount = false;

  // 公司信息
  @observable companyInfo = {};
  // 企业招聘薪资比例
  @observable wageScale = [];
  @observable similarCompanyAvgSalary = '';
  // 招聘岗位分布
  @observable recruitment= { Axis: [], data: [] };
  // 毕业学校
  @observable finishSchool = { Axis: [], data: [] };
  // 所学专业
  @observable majorInfo = { Axis: [], data: [] };
  // 近期招聘信息
  @observable recentRecruitment = [];

  // 招聘平均薪资趋势
  @observable salaryAvgTrend = { Axis: [], data: [] };

  // 离职意向趋势
  @observable leaveTrend = { Axis: [], data: [] };

  @action.bound getReportModule(module, monitorId, reportId, companyName, companyType) {
    this.isMount = true;
    companyHomeApi.getReportModule(module, monitorId, reportId, companyName, companyType)
      .then(action('get team data', (resp) => {
        const respData = resp.data;
        const recruitmentData = respData.recruitAndResumeResponse;
        if (recruitmentData && !this.isEmptyObject(recruitmentData) ) {
          const recruitmentStatistic = recruitmentData.recruitmentStatisticResponse;

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

          // 招聘信息第二块，企业招聘薪资比例
          const wageScale = [];
          const salaryDis = recruitmentStatistic.salaryDis;
          if (salaryDis && !this.isEmptyObject(salaryDis)) {
            let salaryDisCount = 0;
            const salaryDisKey = Object.keys(salaryDis);
            salaryDisKey.forEach((item) => {
              wageScale.push({
                name: item,
                value: (salaryDis[item] * 100).toFixed(2),
                itemStyle: {
                  normal: {
                    color: `rgba(67, 191, 119, ${1 - 0.2 * salaryDisCount})`
                  }
                }
              });
              salaryDisCount++;
            });
          }

          // 招聘信息第三块，招聘岗位分布
          const recruitmentJobAxis = [];
          const recruitmentJobData = [];
          const categoryInfo = recruitmentStatistic.categoryInfo;
          if (categoryInfo && categoryInfo.length > 0) {
            recruitmentStatistic.categoryInfo.forEach((item) => {
              recruitmentJobAxis.push(item.name);
              recruitmentJobData.push((item.value * 100).toFixed(0));
            });
          }

          const staffInfo = recruitmentData.resumeStatisticResponse;
          let staffSchool = staffInfo.schoolInfo;
          let staffSpe = staffInfo.majorInfo;
          // 员工背景，毕业学校
          const staffSchoolAxis = [];
          const staffSchoolData = [];
          if (staffSchool && !this.isEmptyObject(staffSchool)) {
            staffSchool = this.dealWithObjectToArray(staffSchool);
            staffSchool = staffSchool.sort((prev, next) => {
              return prev.value - next.value;
            });
            staffSchool.forEach((item) => {
              staffSchoolAxis.push(item.name);
              staffSchoolData.push(item.value);
            });
          }

          // 员工背景，所学专业
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

          // 近期招聘信息
          let recruitmentInfoData = [];
          const recruitmentInfo = recruitmentData.recruitmentInfo;
          if (recruitmentInfo && !this.isEmptyObject(recruitmentInfo)) {
            recruitmentInfoData = recruitmentInfo.data;
            if (recruitmentInfoData && recruitmentInfoData.length > 0) {
              recruitmentInfoData = recruitmentInfoData.map((item) => {
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

          // 招聘信息
          this.companyInfo = companyInfo;
          this.wageScale = wageScale;
          this.similarCompanyAvgSalary = similarCompanyAvgSalary;
          this.recruitment.Axis = recruitmentJobAxis;
          this.recruitment.data = recruitmentJobData;

          // 员工背景
          this.finishSchool.Axis = staffSchoolAxis;
          this.finishSchool.data = staffSchoolData;
          this.majorInfo.Axis = staffSpeAxis;
          this.majorInfo.data = staffSpeData;

          // 近期招聘职位
          this.recentRecruitment = recruitmentInfoData;
        }
        const teamResponse = respData.teamResponse;
        if (teamResponse && !this.isEmptyObject(teamResponse)) {
          const recruitMonitorAnalyze = teamResponse.recruitMonitorAnalyze;
          console.log(recruitMonitorAnalyze, '------------------------recruitMonitorAnalyze');
          // if (recruitMonitorAnalyze && recruitMonitorAnalyze.size > 0) {
          //   // 先把年取出来
          //   const keys = Object.keys(recruitMonitorAnalyze.toJS());
          //   keys.map((item) => {
          //     years.push(item.split('-')[0]);
          //   });
          //   years = Array.from(new Set(years)).sort();
          //   // 配置好年数组
          //   years.forEach((item) => {
          //     newAddJobData[item] = new Array();
          //   });
          //   const recruitMonitorAnalyzeKeys = Object.keys(recruitMonitorAnalyze.toJS()).sort();
          //   const recruitMonitorAnalyNewData = {};
          //   recruitMonitorAnalyzeKeys.map((data) => {
          //     recruitMonitorAnalyze.map((item, key) => {
          //       if (key === data) {
          //         recruitMonitorAnalyNewData[data] = item.toJS();
          //       }
          //     });
          //   });
          //   // -------------------------------------------------------------
          //   years.map((data) => {
          //     for (const key in recruitMonitorAnalyNewData) {
          //       if (recruitMonitorAnalyNewData.hasOwnProperty(key)) {
          //         const year = key.split('-')[0];
          //         if (data === year) {
          //           const month = Number(key.split('-')[1]);
          //           const obj = {};
          //           obj[month] = recruitMonitorAnalyNewData[key];
          //           newAddJobData[year].push(obj);
          //         }
          //       }
          //     }
          //   });
          //   const newData = newAddJobData[years[years.length - 1]];
          //   newAddJobMonth = Object.keys(newData[newData.length - 1])[0];
          //   newAddJobDetail = Object.values(newData[newData.length - 1])[0];
          // }

          // 招聘平均薪资趋势
          const salaryAvg = teamResponse.salaryAvg;
          const salaryAvgAxis = [];
          const salaryAvgData = [];
          if (salaryAvg && !this.isEmptyObject(salaryAvg)) {
            const dealWithSalaryAvg = this.dealWithObjectToArray(salaryAvg);
            dealWithSalaryAvg.forEach((item) => {
              salaryAvgAxis.push(moment(item.name).format('YYYY年MM月'));
              salaryAvgData.push(item.value ? item.value.toFixed(2) : 0);
            });
            this.salaryAvgTrend.Axis = salaryAvgAxis;
            this.salaryAvgTrend.data = salaryAvgData;
          }

          // 离职意向趋势
          const resumeDis = teamResponse.resumeDis;
          const leaveTrendAxis = [];
          const leaveTrendData = [];
          if (resumeDis && !this.isEmptyObject(resumeDis)) {
            const dealWithResumeDis = this.dealWithObjectToArray(resumeDis);
            dealWithResumeDis.forEach((item) => {
              leaveTrendAxis.push(moment(item.name).format('YYYY年MM月'));
              const itemValueKeys = Object.keys(item.value);
              if (itemValueKeys.length > 0) {
                let itemSum = 0;
                itemValueKeys.forEach((key) => {
                  itemSum += item.value[key];
                });
                leaveTrendData.push({ value: itemSum, item: item.value });
              } else {
                leaveTrendData.push({ value: 0, item: '' });
              }
            });
            this.leaveTrend.Axis = leaveTrendAxis;
            this.leaveTrend.data = leaveTrendData;
          }
        }
        this.isLoading = false;
      }));
  }
}
export default new TeamStore();
