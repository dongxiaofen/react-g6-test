import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';

function TaxCheckItem({taxCheckStore, uiStore}) {
  const dataList = taxCheckStore.taxListData.content;
  const listDom = [];
  if (dataList && dataList.length > 0) {
    dataList.map((obj, idx)=>{
      listDom.push(
        <tr
          key={`${idx}checkList`}
          className={styles.content}>
          <td>{obj.year}年</td>
          <td>{obj.taxIndex}</td>
          <td className={obj.match ? '' : styles.errorColor}>{obj.input}元</td>
          <td className={obj.match ? '' : styles.errorColor}>{obj.match ? '匹配' : '不匹配'}</td>
          <td>{obj.checkTs}</td>
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
      <div className={styles.page}>
        <Pager tData={taxCheckStore.taxListData.content} module="taxCheckPager"
               uiStore={uiStore} type="large"/>
      </div>
    </div>
  );
}

TaxCheckItem.propTypes = {
  taxCheckStore: PropTypes.object,
  uiStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.taxCheckStore.loading === true ? true : false,
    category: 2,
    module: '税务核查列表',
    errCategory: 2,
    error: props.taxCheckStore.taxListData.error,
  }),
})(observer(TaxCheckItem));
