import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import EmployeeTop from './Employee/EmployeeTop';
import EmployeeMessage from './Employee/EmployeeMessage';
import EmployeeDegreeInfo from './Employee/EmployeeDegreeInfo';
import EmployeeSalaryDis from './Employee/EmployeeSalaryDis';
import EmployeeSchoolInfo from './Employee/EmployeeSchoolInfo';
import EmployeeCategoryTypeInfo from './Employee/EmployeeCategoryTypeInfo';
import EmployeeList from './Employee/EmployeeList';
import RecruitAddress from './TeamMonitor/RecruitAddress';
import RecruitPosition from './TeamMonitor/RecruitPosition';
import AvgSalary from './TeamMonitor/AvgSalary';
import Leaving from './TeamMonitor/Leaving';
import PdfTitle from 'components/common/pdf/PdfTitle';
import pathval from 'pathval';

function Team({pdfStore, judgeIsModuleExist}) {
  return (
    <div>
      {
        judgeIsModuleExist('TEAM_RECRUITMENT_RESUME')
          ?
          <div>
            <PdfTitle id="employeeAnchor" module="团队信息" subModule="招聘信息" />
            <EmployeeTop pdfStore={pdfStore} />
            <EmployeeMessage moduleData={pathval.getPathValue(pdfStore, 'team.recruitAndResumeResponse.recruitmentStatisticResponse.categoryInfo')} />
            <EmployeeDegreeInfo moduleData={pathval.getPathValue(pdfStore, 'team.recruitAndResumeResponse.recruitmentStatisticResponse.degreeInfo')} />
            <EmployeeSalaryDis moduleData={pathval.getPathValue(pdfStore, 'team.recruitAndResumeResponse.recruitmentStatisticResponse.salaryDis')} />
            <PdfTitle id="employeeAnchor" module="团队信息" subModule="员工背景" />
            <EmployeeSchoolInfo moduleData={pathval.getPathValue(pdfStore, 'team.recruitAndResumeResponse.resumeStatisticResponse.schoolInfo')} />
            <EmployeeCategoryTypeInfo moduleData={pathval.getPathValue(pdfStore, 'team.recruitAndResumeResponse.resumeStatisticResponse.majorInfo')} />
            <PdfTitle id="employeeAnchor" module="团队信息" subModule="近期招聘岗位" />
            <EmployeeList moduleData={pathval.getPathValue(pdfStore, 'team.recruitAndResumeResponse.recruitmentInfo.data')} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('TEAM_ANALYSIS')
          ?
          <div>
            <PdfTitle module="团队信息" subModule="团队监控分析" />
            <RecruitAddress moduleData = {pathval.getPathValue(pdfStore, 'team.teamResponse.recruitMonitorAnalyze')} />
            <RecruitPosition moduleData = {pathval.getPathValue(pdfStore, 'team.teamResponse.recruitMonitorAnalyze')} />
            <AvgSalary moduleData = {pathval.getPathValue(pdfStore, 'team.teamResponse.salaryAvg')} />
            <Leaving moduleData = {pathval.getPathValue(pdfStore, 'team.teamResponse.resumeDis')} />
          </div>
          :
          ''
      }
    </div>
  );
}

Team.propTypes = {
  pdfStore: PropTypes.object,
};
export default inject('pdfStore')(observer(Team));
