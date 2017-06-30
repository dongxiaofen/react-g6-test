import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';

function TaxUpList({moduleData}) {
  const dataDom = [];
  let idx = 0;
  Object.keys(moduleData).map(key => {
    let item = '';
    if (moduleData[key]) {
      item = (
        <tr key={`${idx}up`}>
          <td>{key}年</td>
          {/*<td>{moduleData[key].XSMLL || moduleData[key].XSMLL === 0 ? moduleData[key].ZCZZL : ''}%</td>*/}
          <td>{moduleData[key].ZCZZL || moduleData[key].ZCZZL === 0 ? moduleData[key].ZCZZL : ''}%</td>
          <td>{moduleData[key].XSZZL || moduleData[key].XSZZL === 0 ? moduleData[key].XSZZL : ''}%</td>
          <td>{moduleData[key].JLRZZL || moduleData[key].JLRZZL === 0 ? moduleData[key].JLRZZL : ''}%</td>
          <td>{moduleData[key].YYLRZZL || moduleData[key].YYLRZZL === 0 ? moduleData[key].YYLRZZL : ''}%</td>
          <td>{moduleData[key].ZYYWSRBDL || moduleData[key].ZYYWSRBDL === 0 ? moduleData[key].ZYYWSRBDL : ''}%</td>
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
          <th className={styles.two}>资产增长率</th>
          <th className={styles.three}>销售增长率</th>
          <th className={styles.four}>净利润增长率</th>
          <th className={styles.five}>营业利润增长率</th>
          <th>主营业务收入变动率</th>
        </tr>
        </thead>
        <tbody>
        {dataDom}
        </tbody>
      </table>
    </div>
  );
}

TaxUpList.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(TaxUpList);
