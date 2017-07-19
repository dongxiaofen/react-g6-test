import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';
import styles from '../EmployeeSalaryDis/index.less';

function EmployeeSchoolInfo({moduleData}) {
  if (!moduleData || Object.keys(moduleData).length === 0) {
    return (
      <div>
        <SecondTitle module="毕业学校" />
        <PdfNotFound />
      </div>
    );
  }
  const total = () => {
    let sum = 0;
    Object.keys(moduleData).forEach((key) => {
      sum += moduleData[key];
    });
    return sum;
  };
  return (
    <div className={styles.wrap}>
      <SecondTitle module="毕业学校" />
      <table>
        <thead>
        <tr>
          <th>学校</th>
          <th>百分比</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>985/211本科院校{total()}</td>
          <td>{`${parseFloat(moduleData['985/211本科院校'] / total()).toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>专科院校</td>
          <td>{`${parseFloat(moduleData['专科院校'] / total()).toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>其他院校</td>
          <td>{`${parseFloat(moduleData['其他院校'] / total()).toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>普通本科院校</td>
          <td>{`${parseFloat(moduleData['普通本科院校'] / total()).toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>民办本科院校</td>
          <td>{`${parseFloat(moduleData['民办本科院校'] / total()).toFixed(2)}`}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

EmployeeSchoolInfo.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(EmployeeSchoolInfo);
