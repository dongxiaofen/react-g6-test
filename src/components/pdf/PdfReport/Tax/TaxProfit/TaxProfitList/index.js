import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';

function TaxProfitList({moduleData}) {
  // const moduleData = {
  //   2014: null,
  //   2015: {XSJLL: 0.2, XSMLL: 16.89, YYJLL: -0.01, ZCJLL: 0, CBFYJLL: 0.18, ZYYWLRL: 15.78}
  // };
  const dataDom = [];
  let idx = 0;
  Object.keys(moduleData).map(key => {
    let item = '';
    if (moduleData[key]) {
      item = (
        <tr key={`${idx}profit`}>
          <td>{key}年</td>
          <td>{moduleData[key].XSMLL || moduleData[key].XSMLL === 0 ? moduleData[key].XSMLL : ''}%</td>
          <td>{moduleData[key].XSJLL || moduleData[key].XSJLL === 0 ? moduleData[key].XSJLL : ''}%</td>
          <td>{moduleData[key].YYJLL || moduleData[key].YYJLL === 0 ? moduleData[key].YYJLL : ''}%</td>
          <td>{moduleData[key].CBFYJLL || moduleData[key].CBFYJLL === 0 ? moduleData[key].CBFYJLL : ''}%</td>
          <td>{moduleData[key].ZYYWLRL || moduleData[key].ZYYWLRL === 0 ? moduleData[key].ZYYWLRL : ''}%</td>
          <td>{moduleData[key].ZCJLL || moduleData[key].ZCJLL === 0 ? moduleData[key].ZCJLL : ''}%</td>
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
