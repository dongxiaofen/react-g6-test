import React, {Component, PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
@observer
export default class Scale extends Component {
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
    const listData = [
      {name: '规模不限', value: 'UNLIMITED'},
      {name: '1-10人', value: 'FIRST_LEVEL'},
      {name: '10-50人', value: 'SECOND_LEVEL'},
      {name: '50-150人', value: 'THIRD_LEVEL'},
      {name: '150-500人', value: 'FORTH_LEVEL'},
      {name: '500-1000人', value: 'FIFTH_LEVEL'},
      {name: '1000人以上', value: 'SIXTH_LEVEL'},
      {name: '2000人以上', value: 'SEVENTH_LEVEL'},
      {name: '5000人以上', value: 'EIGHTH_LEVEL'},
      {name: '10000人以上', value: 'NINTH_LEVEL'},
    ];
    // 创建列表
    const list = [];
    listData.map((item, idx)=>{
      if (item.value === this.props.ruleStore.scale) {
        list.push(
          <li
            onMouseDown={this.props.ruleStore.selectScale.bind(null, item.value, item.name)}
            key={`${idx}scaleList`}
            className={styles.listSingleActive}>
            {item.name}
          </li>
        );
      } else {
        list.push(
          <li
            onMouseDown={this.props.ruleStore.selectScale.bind(null, item.value, item.name)}
            key={`${idx}scaleList`}
            className={styles.listSingle}>
            {item.name}
          </li>
        );
      }
    });
    return (
      <div className={styles.box}>
        <div className={styles.title}>企业规模</div>
        <div className={styles.content}>
          <div className={styles.inputWrap}>
            <div
              tabIndex="1"
              onFocus={this.showStatus.bind(null, true)}
              onBlur={this.showStatus.bind(null, false)}
              className={styles.text}>
              {this.props.ruleStore.scaleName}
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
