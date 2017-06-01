import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import pathval from 'pathval';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';
import styles from './index.less';

function EmployeeTop({ pdfStore }) {
  let locations = '';
  const scale = pathval.getPathValue(pdfStore, 'team.recruitAndResumeResponse.recruitmentStatisticResponse.scale');
  const workingYearsAvg = pathval.getPathValue(pdfStore, 'team.recruitAndResumeResponse.recruitmentStatisticResponse.workingYearsAvg');
  const salaryAvg = pathval.getPathValue(pdfStore, 'team.recruitAndResumeResponse.recruitmentStatisticResponse.salaryAvg');
  const location = pathval.getPathValue(pdfStore, 'team.recruitAndResumeResponse.recruitmentStatisticResponse.location');
  if (location) {
    locations = location.join(',');
  }
  if (!scale && !workingYearsAvg && !location && !salaryAvg) {
    return (
      <div>
        <SecondTitle module="招聘信息" />
        <PdfNotFound />
      </div>
    );
  }
  if (scale === '' && workingYearsAvg === 0 && location.size === 0 && salaryAvg === 0) {
    return (
      <div>
        <SecondTitle module="招聘信息" />
        <PdfNotFound />
      </div>
    );
  }
  // isNaN(aaa) ? aaa : aaa.toFixed(2)
  return (
    <div>
      <SecondTitle module="招聘信息" />
      <div className={styles.section1}>
        {!scale && !locations && !salaryAvg && !workingYearsAvg ?
          <PdfNotFound /> :
          <div className={styles.title}>
            <div>公司规模：{!scale ? '暂无信息' : scale}</div>
            <div>办公地点：{!locations ? '暂无信息' : locations}</div>
            <div>招聘平均薪资：{!salaryAvg ? '暂无信息' : `${salaryAvg.toFixed(2)}元`}</div>
            <div>平均工作经验：{!workingYearsAvg ? '暂无信息' : `${workingYearsAvg.toFixed(2)}年`}</div>
          </div>
        }
      </div>
    </div>
  );
}

EmployeeTop.propTypes = {
  pdfStore: PropTypes.object,
};
export default observer(EmployeeTop);
