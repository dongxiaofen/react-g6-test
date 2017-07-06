import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';

function TaxOperationList({moduleData}) {
  const dataDom = [];
  // const moduleData = {
  //   2014: null,
  //   2015: {GSGM: 1212, CWFYZB: 2.74, GLFYZB: 8.91, XSFYZB: 16.62, ZZCYSRB: 0}
  // };
  let idx = 0;
  Object.keys(moduleData).map(key => {
    let item = '';
    if (moduleData[key]) {
      item = (
        <tr key={`${idx}operation`}>
          <td>{key}年</td>
          {/* <td>{moduleData[key].ZZCYSRB}%</td> */}
          <td>{moduleData[key].CWFYZB || moduleData[key].CWFYZB === 0 ? moduleData[key].CWFYZB : ''}%</td>
          <td>{moduleData[key].GLFYZB || moduleData[key].GLFYZB === 0 ? moduleData[key].GLFYZB : ''}%</td>
          {/* <td>{moduleData[key].GSGM}%</td> */}
          <td>{moduleData[key].XSFYZB || moduleData[key].XSFYZB === 0 ? moduleData[key].XSFYZB : ''}%</td>
        </tr>
      );
    } else {
      item = (
        <tr key={`${idx}profit`}>
          <td>{key}年</td>
          <td colSpan={6} className={styles.noData}>暂无数据</td>
        </tr>
      );
    }
    dataDom.push(item);
    idx++;
  });
  return (
    <div className={styles.box}>
      <table className={styles.table}>
        <thead>
        <tr>
          <th className={styles.first}></th>
          {/* <th className={styles.two}>总资产与收入比</th> */}
          <th className={styles.three}>财务费用率</th>
          <th className={styles.four}>管理费用率</th>
          {/* <th className={styles.five}>公司规模</th> */}
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