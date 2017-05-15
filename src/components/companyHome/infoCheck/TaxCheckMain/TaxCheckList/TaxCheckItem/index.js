import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function TaxCheckItem({taxCheckStore}) {
  const dataList = taxCheckStore.taxListData;
  const listDom = [];
  if (dataList && dataList.length > 0) {
    dataList.map((obj, idx)=>{
      listDom.push(
        <tr
          key={`${idx}checkList`}
          className={styles.content}>
          <td>年度</td>
          <td>指标</td>
          <td>核查金额</td>
          <td>与实际金额核查结果</td>
          <td>核查时间</td>
        </tr>
      );
    });
  }
  return (
    <div className={styles.box}>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.title}>
            <td>年度</td>
            <td>指标</td>
            <td>核查金额</td>
            <td>与实际金额核查结果</td>
            <td>核查时间</td>
          </tr>
          {listDom}
        </tbody>
      </table>
    </div>
  );
}

TaxCheckItem.propTypes = {
  taxCheckStore: PropTypes.object,
};
export default observer(TaxCheckItem);
