import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import { reaction } from 'mobx';

import Pager from 'components/common/Pager';

import styles from './index.less';
// import { loadingComp } from 'components/hoc';
// import Pager from 'components/common/Pager';
let bindPgaer;

@inject('taxCheckStore', 'uiStore')
@observer
export default class TaxCheckItem extends Component {
  static propTypes = {
    taxCheckStore: PropTypes.object,
    uiStore: PropTypes.object,
  };

  componentDidMount() {
    bindPgaer = reaction(
      () => this.props.uiStore.uiState.taxInfoCheckPager.index,
      () => {
        this.props.taxCheckStore.getTaxCheckInfo();
      }
    );
  }

  componentWillUnmount() {
    bindPgaer();
    this.props.uiStore.updateUiStore('taxInfoCheckPager.index', 1);
  }

  render() {
    const dataList = this.props.taxCheckStore.taxCheckInfo.content;
    const listGroup = [];
    if (dataList && dataList.length > 0) {
      let lastTime = '';
      let group = [];
      dataList.map((item) => {
        if (item.checkTs === lastTime) {
          group.push(item);
        } else {
          if (group.length > 0 ) {
            listGroup.push(group);
          }
          group = [];
          lastTime = item.checkTs;
          group.push(item);
        }
      });
      if (group.length > 0 ) {
        listGroup.push(group);
      }
    }
    const tableDoms = [];
    if (listGroup.length > 0) {
      listGroup.map((item, _idx) => {
        const tableBody = [];
        item.map((obj, idx) => {
          tableBody.push(
            <tr
              key={`${idx}checkListRow`}
              className={styles.content}>
              <td>{obj.year}年</td>
              <td>{obj.taxIndex}</td>
              <td className={obj.match ? '' : styles.errorColor}>{obj.input}元</td>
              <td className={obj.match ? '' : styles.errorColor}>{obj.match ? '匹配' : '不匹配'}</td>
              {idx === 0 ? <td rowSpan="1000">{obj.checkTs}</td> : null}
            </tr>
          );
        });
        const tableDom = (
          <table className={styles.table} key={`${_idx}checkListTbale`}>
            <tbody>
              <tr className={styles.title}><td width="100">年度</td><td width="200">指标</td><td width="150">输入金额</td><td width="200">模型评估结果</td><td>核查时间</td></tr>
              {tableBody}
            </tbody>
          </table>
        );
        tableDoms.push(tableDom);
      });
    }

    return (
      <div className={styles.box}>
        <div className={styles.boxTop}>
          <div className={styles.companyName}>{this.props.taxCheckStore.taxCheckInfoCompany}</div>
          <span className={styles.text}>
          核查结果提示：<span>输入金额和模型评估结果误差在±5%内即“匹配”，超过即“不匹配”</span>
          </span>
        </div>
        <div className={styles.tableWrap}>
          {tableDoms}
          <Pager tData={dataList} module="taxInfoCheckPager" type="small" />
        </div>
      </div>
    );
  }
}
