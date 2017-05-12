import React, {Component, PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import config from 'dict/mapConfig';
@observer
export default class Area extends Component {
  static propTypes = {
    ruleStore: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      isExtend: false,
    };
  }
  showStatus = (value) => {
    this.setState({
      isExtend: value,
    });
  }
  render() {
    // 组织基础数据
    const listData = [];
    Object.keys(config).map((key)=>{
      if (key !== '中国') {
        listData.push(key);
      }
    });
    // 合并地区不限
    const areaList = ['地区不限'];
    const areaListAll = areaList.concat(listData);
    // 创建列表
    const list = [];
    areaListAll.map((item, idx)=>{
      if (item === this.props.ruleStore.area) {
        list.push(
          <li
            onMouseDown={this.props.ruleStore.selectArea.bind(null, item)}
            key={`${idx}areaList`}
            className={styles.listSingleActive}>
            {item}
          </li>
        );
      } else {
        list.push(
          <li
            onMouseDown={this.props.ruleStore.selectArea.bind(null, item)}
            key={`${idx}areaList`}
            className={styles.listSingle}>
            {item}
          </li>
        );
      }
    });
    return (
      <div className={styles.box}>
        <div className={styles.title}>企业地区</div>
        <div className={styles.content}>
          <div className={styles.inputWrap}>
            <div
              tabIndex="1"
              onFocus={this.showStatus.bind(null, true)}
              onBlur={this.showStatus.bind(null, false)}
              className={styles.text}>
              {this.props.ruleStore.area}
            </div>
            <i className={this.state.isExtend ? styles.icon : styles.iconActive}></i>
          </div>
          <ul className={this.state.isExtend ? styles.list : styles.hidden}>
            {list}
          </ul>
        </div>
      </div>
    );
  }
}
