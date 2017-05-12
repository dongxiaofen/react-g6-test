import React, {Component, PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
@observer
export default class EventType extends Component {

  static propTypes = {
    ruleStore: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  eventToggle = (evt)=>{
    this.props.ruleStore.eventToggle(true);
    evt.stopPropagation();
  }

  render() {
    const corpData = this.props.ruleStore.eventTypeDataCORP;
    const legalData = this.props.ruleStore.eventTypeDataLEGAL;
    const newsData = this.props.ruleStore.eventTypeDataNEWS;
    // 选择的二级数据
    const oneType = this.props.ruleStore.eventType;
    let twoData = '';
    if (oneType === 'CORP') {
      twoData = corpData;
    }
    if (oneType === 'LEGAL') {
      twoData = legalData;
    }
    if (oneType === 'NEWS') {
      twoData = newsData;
    }
    // 二级数据dom
    const twoDom = [];
    if (twoData && twoData.length > 0) {
      twoData.map((item, idx)=>{
        let stylesTwo = styles.listTwoChilden;
        // 选中样式
        if (this.props.ruleStore.eventTypeTwo === item.name) {
          stylesTwo = styles.listTwoChildenActive;
        }
        // 组织dom
        twoDom.push(
          <div
            key={`${idx}two`}
            tabIndex="1"
            onMouseDown={this.props.ruleStore.setEventTypeTwo.bind(this, item.value, item.name, this.props.ruleStore.eventTypeOne)}
            className={stylesTwo}>
            {item.name}
          </div>
        );
      });
    }
    // 三级数据dom
    const threeData = this.props.ruleStore.eventTypeThreeList;
    const threeDom = [];
    if (threeData && threeData.length > 0) {
      threeData.map((item, idx)=>{
        let stylesThree = styles.listThreeChilden;
        // 选中样式
        if (this.props.ruleStore.eventTypeThree === item.name) {
          stylesThree = styles.listThreeChildenActive;
        }
        // 组织dom
        threeDom.push(
          <div
            key={`${idx}three`}
            tabIndex="1"
            onMouseDown={this.props.ruleStore.setEventTypeThree.bind(this, item)}
            className={stylesThree}>
            {item.name}
          </div>
        );
      });
    }
    // 筛选
    const searchData = this.props.ruleStore.eventSearchList;
    const filterData = [];
    if (searchData && searchData.length > 0) {
      searchData.map((obj, idx)=>{
        // 判断已选择样式
        let searchSingleStyle = styles.searchSingle;
        if (this.props.ruleStore.eventTypeThreeId === obj[2].id) {
          searchSingleStyle = styles.searchSingleActive;
        }
        // 组织数据
        filterData.push(
          <div
            onClick={this.props.ruleStore.selectSearchEvent.bind(this, obj)}
            key={`${idx}filter`}
            className={searchSingleStyle}>
            {obj[0]} / {obj[1]} / {obj[2].name}
          </div>
        );
      });
    }
    return (
      <div className={styles.box}>
        <div className={styles.title}>事件类型</div>
        <div
          tabIndex="1"
          onClick={this.eventToggle.bind()}
          className={styles.content}>
          <div
            className={styles.inputWrap}>
            <div
              className={this.props.ruleStore.eventTypeOne !== '请选择或搜索' ? styles.textFocus : styles.text}>
              {this.props.ruleStore.eventTypeOne}
              {this.props.ruleStore.eventTypeTwo ? ' / ' + this.props.ruleStore.eventTypeTwo : ''}
              {this.props.ruleStore.eventTypeThree ? ' / ' + this.props.ruleStore.eventTypeThree : ''}
            </div>
            <i className={this.props.ruleStore.eventTypeShow ? styles.icon : styles.iconActive}></i>
          </div>
          <div className={this.props.ruleStore.submitType === true && this.props.ruleStore.eventTypeThreeId.length < 1 ? styles.validate : styles.hidden}>
            事件类型必选
          </div>
          <div
            className={this.props.ruleStore.eventTypeShow ? styles.listWrap : styles.hidden}>
            <div className={styles.searchWrap}>
              <i></i>
              <input
                onChange={this.props.ruleStore.eventSearch.bind(this)}
                value={this.props.ruleStore.eventSarch}
                placeholder="请输入搜索内容" />
            </div>
            <div className={this.props.ruleStore.eventSearchList.length > 0 ? styles.searchList : styles.hidden}>
              {filterData}
            </div>
            <div className={this.props.ruleStore.eventSearchList.length > 0 ? styles.hidden : styles.list}>
              <div className={styles.listOne}>
                <div
                  tabIndex="1"
                  onMouseDown={this.props.ruleStore.setEventType.bind(this, 'CORP', '工商信息')}
                  className={this.props.ruleStore.eventType === 'CORP' ? styles.listOneChildenActive : styles.listOneChilden}>
                  工商信息
                </div>
                <div
                  tabIndex="1"
                  onMouseDown={this.props.ruleStore.setEventType.bind(this, 'LEGAL', '法务信息')}
                  className={this.props.ruleStore.eventType === 'LEGAL' ? styles.listTwoChildenActive : styles.listTwoChilden}>
                  法务信息
                </div>
                <div
                  tabIndex="1"
                  onMouseDown={this.props.ruleStore.setEventType.bind(this, 'NEWS', '新闻舆情')}
                  className={this.props.ruleStore.eventType === 'NEWS' ? styles.listThreeChildenActive : styles.listThreeChilden}>
                  新闻舆情
                </div>
              </div>
              <div className={styles.listTwo}>
                {twoDom}
              </div>
              <div className={styles.listThree}>
                {threeDom}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
