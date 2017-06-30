import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { loadingComp } from 'components/hoc';

function TaxProfitList({taxStore}) {
  const data = taxStore.profitDataList;
  const dataDom = [];
  if (data) {
    let idx = 0;
    let noData = '';
    Object.keys(data).map(key => {
      noData = data[key] ? '' : (<div className={styles.noData}>暂无数据</div>);
      dataDom.push(
        <tr key={`${idx}profit`}>
          <td>{key}年</td>
          <td>{data[key].XSMLL}%</td>
          <td>{data[key].XSJLL}%</td>
          <td>{data[key].YYJLL}%</td>
          <td>{data[key].CBFYJLL}%</td>
          <td>{data[key].ZYYWLRL}%</td>
          <td>{data[key].ZCJLL}%</td>
          {noData}
        </tr>
      );
      idx ++;
    });
  }
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

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.taxStore.loading === true ? true : false,
    imgCategory: 14,
    category: 2,
    module: '盈利能力指标',
    errCategory: 0,
    error: props.taxStore.profitDataList.length === 0,
  }),
})(observer(TaxProfitList));
