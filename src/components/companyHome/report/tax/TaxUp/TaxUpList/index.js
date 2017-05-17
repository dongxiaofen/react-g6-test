import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function TaxUpList({}) {
  return (
    <div className={styles.box}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.first}></th>
            <th>资产增长率</th>
            <th>销售增长率</th>
            <th>净利润增长率</th>
            <th>营业利润增长率</th>
            <th>主营业务收入变动率</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2012</td>
            <td>2</td>
            <td>3</td>
            <td>2</td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr>
            <td>2013</td>
            <td>2</td>
            <td>3</td>
            <td>2</td>
            <td>3</td>
            <td>3</td>
          </tr>
          <tr>
            <td>2014</td>
            <td>2</td>
            <td>3</td>
            <td>2</td>
            <td>3</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

TaxUpList.propTypes = {
  taxStore: PropTypes.object,
};
export default observer(TaxUpList);
