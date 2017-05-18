import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function TaxOperationList({moduleData}) {
  const dataDom = [];
  const data = moduleData.operating_capability;
  let idx = 0;
  Object.keys(data).map(key => {
    dataDom.push(
      <tr key={`${idx}operation`}>
        <td>{key}年</td>
        <td>{data[key].ZZCYSRB}%</td>
        <td>{data[key].CWFYZB}%</td>
        <td>{data[key].GLFYZB}%</td>
        <td>{data[key].GSGM}%</td>
        <td>{data[key].XSFYZB}%</td>
      </tr>
    );
    idx ++;
  });
  return (
    <div className={styles.box}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.first}></th>
            <th className={styles.two}>总资产与收入比</th>
            <th className={styles.three}>财务费用率</th>
            <th className={styles.four}>管理费用率</th>
            <th className={styles.five}>公司规模</th>
            <th>销售费用率</th>
          </tr>
        </thead>
        <tbody>
          {dataDom}
        </tbody>
      </table>
    </div>
  );
}

TaxOperationList.propTypes = {
  taxStore: PropTypes.object,
};
export default observer(TaxOperationList);
