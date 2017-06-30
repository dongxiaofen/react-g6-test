import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function TaxUpList({moduleData}) {
  const dataDom = [];
  if (moduleData) {
    let idx = 0;
    let noData = '';
    Object.keys(moduleData).map(key => {
      noData = moduleData[key] ? '' : (<div className={styles.noData}>暂无数据</div>);
      dataDom.push(
        <tr key={`${idx}up`}>
          <td>{key}年</td>
          <td>{moduleData[key].ZCZZL ? moduleData[key].ZCZZL : ''}%</td>
          <td>{moduleData[key].XSZZL ? moduleData[key].XSZZL : ''}%</td>
          <td>{moduleData[key].JLRZZL ? moduleData[key].JLRZZL : ''}%</td>
          <td>{moduleData[key].YYLRZZL ? moduleData[key].YYLRZZL : ''}%</td>
          <td>{moduleData[key].ZYYWSRBDL ? moduleData[key].ZYYWSRBDL : ''}%</td>
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
