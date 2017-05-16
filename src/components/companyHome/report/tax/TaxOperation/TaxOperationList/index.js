import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function TaxOperationList({}) {
  return (
    <div className={styles.box}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.first}></th>
            <th>总资产与收入比</th>
            <th>财务费用率</th>
            <th>管理费用率</th>
            <th>销售费用率</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2012</td>
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
          </tr>
          <tr>
            <td>2014</td>
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

TaxOperationList.propTypes = {
  taxStore: PropTypes.object,
};
export default observer(TaxOperationList);
