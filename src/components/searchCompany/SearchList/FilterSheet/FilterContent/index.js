import React, {Component, PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
@observer
export default class FilterContent extends Component {
  static propTypes = {
    filterSheet: PropTypes.object,
    filterArray: PropTypes.object,
    filterArrayStatus: PropTypes.object,
    filterSingleShow: PropTypes.func,
    filterItemClick: PropTypes.func,
  }

  componentDidMount() {
    let industryType = '';
    if (document.getElementById('industryType')) {
      industryType = document.getElementById('industryType').offsetHeight;
    }
    let scale = '';
    if (document.getElementById('scale')) {
      scale = document.getElementById('scale').offsetHeight;
    }
    let province = '';
    if (document.getElementById('province')) {
      province = document.getElementById('province').offsetHeight;
    }
    let companyStatus = '';
    if (document.getElementById('companyStatus')) {
      companyStatus = document.getElementById('companyStatus').offsetHeight;
    }
    let stockMarket = '';
    if (document.getElementById('stockMarket')) {
      stockMarket = document.getElementById('stockMarket').offsetHeight;
    }
    const arrayList = {
      industryType: industryType,
      scale: scale,
      province: province,
      companyStatus: companyStatus,
      stockMarket: stockMarket
    };
    const arrayListStatus = {
      industryType: false,
      scale: false,
      province: false,
      companyStatus: false,
      stockMarket: false
    };
    // console.log(arrayList, '=====arrayList');
    this.props.filterSingleShow('value', arrayList, arrayListStatus);
  }

  // 选择筛选项
  itemCheck = (key, idx) => {
    this.props.filterItemClick(key, idx, 'ok');
  }

  // 取消筛选项
  itemCancelCheck = (key, idx) => {
    this.props.filterItemClick(key, idx, 'cancel');
  }

  // 每项收起展开
  filterShow = (key) => {
    this.props.filterSingleShow('show', key);
  }

  createFilter(filterSheet) {
    const output = [];
    // let rowIndex = 0;if
    const data = filterSheet.data;
    const filterStatus = filterSheet.filterStatus;
    const config = filterSheet.config;
    const filterArray = this.props.filterArray;
    const filterArrayStatus = this.props.filterArrayStatus;
    // 循环每一个大类
    data.map((obj, index)=>{
      // 每一个小项
      const itemSingle = [];
      // 判断是否全选
      let allStatus = true;
      // 循环每一个小类并push到itemSingle
      obj.value.map((item, idx)=>{
        // 判断是否被选择
        const itemStatus = filterStatus[obj.key][idx];
        if (itemStatus) {
          itemSingle.push(
            <span onClick={this.itemCheck.bind(this, obj.key, idx)} key={`item${idx}`} className={`${styles.activeItem}`}>{item}</span>
          );
        } else {
          allStatus = false;
          itemSingle.push(
            <span
              onClick={this.itemCancelCheck.bind(this, obj.key, idx)}
              key={`item${idx}`} className={`${styles.item}`}>{item}</span>
          );
        }
      });
      // 标题
      const title = config[obj.key];
      // 是否全选
      let allItem = (
        <span
          onClick={this.itemCheck.bind(this, obj.key, 'all')}
          className={`${styles.activeAllItem}`}>
          全选
        </span>
      );
      if (allStatus === false) {
        allItem = (
          <span
            onClick={this.itemCancelCheck.bind(this, obj.key, 'all')}
            className={`${styles.allItem}`}>
            全选
          </span>
        );
      }
      // 是否显示每一种类型的收起展开
      let toggleItem = '';
      let toggleStatus = '';
      if (filterArray && filterArrayStatus) {
        if ((filterArray[obj.key] - 0) > 50) {
          toggleStatus = filterArrayStatus[obj.key] ? styles.show : '';
          toggleItem = (
            <div
              onClick={this.filterShow.bind(this, obj.key)}
              className={`${styles.toggleItem}`}>
              <a>{filterArrayStatus[obj.key] ? '收起' : '更多'}</a>
              <span>
                <i></i>
              </span>
            </div>
          );
        }
      }
      output.push(
        <div key={`single${index}`} className={`${styles.singleWrap} ${toggleStatus}`}>
          <div className={`${styles.title}`}>
            {title}：
          </div>
          <div
            id={obj.key} className={`${styles.itemWrap}`}>
            {allItem}
            {itemSingle}
          </div>
          {toggleItem}
        </div>
      );
    });
    return output;
  }

  render() {
    const filterSheet = this.props.filterSheet;
    return (
      <div className={`${styles.filterWrap}`}>
        {this.createFilter(filterSheet)}
      </div>
    );
  }
}
