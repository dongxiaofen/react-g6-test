import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function TaxProfitList({moduleData}) {
  const dataDom = [];
  let idx = 0;
  Object.keys(moduleData).map(key => {
    dataDom.push(
      <tr key={`${idx}profit`}>
        <td>{key}年</td>
        <td>{moduleData[key].XSMLL}%</td>
        <td>{moduleData[key].XSJLL}%</td>
        <td>{moduleData[key].YYJLL}%</td>
        <td>{moduleData[key].CBFYJLL}%</td>
        <td>{moduleData[key].ZYYWLRL}%</td>
        <td>{moduleData[key].ZCJLL}%</td>
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
            <th className={styles.two}>销售毛利率</th>
            <th className={styles.three}>销售净利率</th>
            <th className={styles.four}>营业净利率</th>
            <th className={styles.five}>成本费用净利率</th>
            <th className={styles.six}>主营业务利润率</th>
            <th>资产净利率</th>
          </tr>
        </thead>
        <tbody>
          {dataDom}
        </tbody>
      </table>
    </div>
  );
}

TaxProfitList.propTypes = {
  taxStore: PropTypes.object,
};

export default observer(TaxProfitList);
