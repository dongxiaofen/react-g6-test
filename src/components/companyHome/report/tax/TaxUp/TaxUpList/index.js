import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { loadingComp } from 'components/hoc';

function TaxUpList({taxStore}) {
  const data = taxStore.upDataList;
  const dataDom = [];
  let idx = 0;
  Object.keys(data).map(key => {
    dataDom.push(
      <tr key={`${idx}up`}>
        <td>{key}年</td>
        <td>{data[key].ZCZZL}%</td>
        <td>{data[key].XSZZL}%</td>
        <td>{data[key].JLRZZL}%</td>
        <td>{data[key].YYLRZZL}%</td>
        <td>{data[key].ZYYWSRBDL}%</td>
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
  taxStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.taxStore.loading === true ? true : false,
    imgCategory: 14,
    category: 2,
    module: '成长能力指标',
    errCategory: 0,
    error: props.taxStore.upDataList.length === 0,
  }),
})(observer(TaxUpList));
