import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function TaxProfitList({}) {
  return (
    <div className={styles.box}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.first}></th>
            <th>销售毛利率</th>
            <th>销售净利率</th>
            <th>营业净利率</th>
            <th>成本费用净利率</th>
            <th>主营业务利润率</th>
            <th>资产净利率</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2012</td>
            <td>2</td>
            <td>3</td>
            <td>2</td>
            <td>3</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>2013</td>
            <td>2</td>
            <td>3</td>
            <td>2</td>
            <td>3</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>2014</td>
            <td>2</td>
            <td>3</td>
            <td>2</td>
            <td>3</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

TaxProfitList.propTypes = {
  taxStore: PropTypes.object,
};
export default observer(TaxProfitList);
