import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';
import styles from './index.less';

function EmployeeSalaryDis({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="招聘信息－招聘平均薪资" />
        <PdfNotFound />
      </div>
    );
  }
  const pointData = (data) => {
    if (data === undefined) {
      return '0.00';
    }
    return data.toFixed(2);
  };

  console.log(moduleData['2k以下'], '------------');
  return (
    <div className={styles.wrap}>
      <SecondTitle module="招聘信息－招聘平均薪资" />
      <table>
        <thead>
        <tr>
          <th>等级</th>
          <th>百分比</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>2k以下</td>
          <td>{moduleData['2k以下'] === 0.00 ? moduleData['2k以下'] : pointData(moduleData['2k以下'])}</td>
        </tr>
        <tr>
          <td>2k-4k</td>
          <td>{moduleData['2k-4k'] === 0.00 ? moduleData['2k-4k'] : pointData(moduleData['2k-4k'])}</td>
        </tr>
        <tr>
          <td>4k-8k</td>
          <td>{moduleData['4k-8k'] === 0.00 ? moduleData['4k-8k'] : pointData(moduleData['4k-8k'])}</td>
        </tr>
        <tr>
          <td>8k-10k</td>
          <td>{moduleData['8k-10k'] === 0.00 ? moduleData['8k-10k'] : pointData(moduleData['8k-10k'])}</td>
        </tr>
        <tr>
          <td>10k以上</td>
          <td>{moduleData['10k以上'] === 0.00 ? moduleData['10k以上'] : pointData(moduleData['10k以上'])}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

EmployeeSalaryDis.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(EmployeeSalaryDis);
