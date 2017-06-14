import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';
class Axis extends Component {
  static propTypes = {
    timeAxisStore: PropTypes.object,
    routing: PropTypes.object,
    bannerStore: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.currStep = 0;
  }
  componentDidMount() {
    const size = Object.keys(this.props.timeAxisStore.axisData.data).length;
    if (size > 9) {
      const scrollCon = document.getElementById('scrollCon');
      const scrollBar = document.getElementById('scrollBar');
      const scrollConWrap = document.getElementById('scrollConWrap');
      const barStep = 90 / (size - 9);
      const conStep = 1 / 9 * 100;
      const totalStep = size - 9;
      scrollConWrap.addEventListener('mousewheel', (evt) => {
        if (evt.wheelDelta > 0) {
          if (this.currStep >= 1) {
            this.currStep--;
            evt.preventDefault();
          } else {
            this.currStep = 0;
          }
        } else {
          if (Math.abs(this.currStep) <= totalStep - 1) {
            this.currStep++;
            evt.preventDefault();
          } else {
            this.currStep = totalStep;
          }
        }
        scrollBar.style.left = this.currStep * barStep + '%';
        scrollCon.style.left = -this.currStep * conStep + '%';
      });
      scrollConWrap.addEventListener('DOMMouseScroll', (evt) => {
        if (evt.detail <= 0) {
          if (this.currStep > 0) {
            this.currStep--;
            evt.preventDefault();
          } else {
            this.currStep = 0;
          }
        } else {
          if (Math.abs(this.currStep) < totalStep) {
            this.currStep++;
            evt.preventDefault();
          } else {
            this.currStep = totalStep;
          }
        }
        scrollBar.style.left = this.currStep * barStep + '%';
        scrollCon.style.left = -this.currStep * conStep + '%';
      });
    }
  }
  getDetail() {
    const companyId = this.props.timeAxisStore.companyId;
    this.props.timeAxisStore.getAxisDetail(companyId, ...arguments);
  }
  createLabel = (labelConf) => {
    return labelConf.map((item, idx) => {
      if (!item.hide) {
        return <div key={idx} className={styles.labelItem}>{item.label}</div>;
      }
    });
  }
  createLine = (sortedTime, labelConf, moduleData) => {
    const minAndmax = this.computeMinAndMax(this.props.timeAxisStore.axisData.data);
    const itemList = {};
    labelConf.map((conf, idx) => {
      if (conf.hide) return;
      itemList[conf.key] = [];
      sortedTime.map(time => {
        const mainCount = moduleData[time][conf.key].main;
        const relatedCount = moduleData[time][conf.key].related;
        itemList[conf.key].push(
          <div
            key={time + idx}
            className={styles.iconItem}
            style={{width: 100 / sortedTime.length + '%'}}
            >
            {!!mainCount && <div
              style={this.mapIconStyle(mainCount, minAndmax)}
              className={styles.mainItem}
              onClick={this.getDetail.bind(this, conf.key, time, 'main')}>{mainCount}</div>}
            {!!relatedCount && <div
              style={this.mapIconStyle(relatedCount, minAndmax)}
              className={styles.relatedItem}
              onClick={this.getDetail.bind(this, conf.key, time, 'related')}>{relatedCount}</div>}
          </div>
        );
      });
    });
    itemList.timeList = sortedTime.map(time => {
      return <div key={time} style={{width: 100 / sortedTime.length + '%'}} className={styles.timeItem}>{time}</div>;
    });
    return Object.keys(itemList).map(labelKey => {
      return <div key={labelKey} className={styles.lineItem}>{itemList[labelKey]}</div>;
    });
  }
  computeMinAndMax(obj) {
    const arr = [];
    Object.keys(obj).map(time => {
      Object.keys(obj[time]).map(type => {
        Object.keys(obj[time][type]).map(key => {
          if (obj[time][type][key] > 0) {
            arr.push(obj[time][type][key]);
          }
        });
      });
    });
    return {
      min: Math.min.apply(null, arr),
      max: Math.max.apply(null, arr)
    };
  }
  mapIconStyle(value, minAndmax) {
    const min = 20;
    const max = 28;
    const weight = minAndmax.min === minAndmax.max ? max : (value - minAndmax.min) / (minAndmax.max - minAndmax.min) * (max - min) + min;
    return {position: 'relative', width: weight, height: weight, lineHeight: weight + 'px'};
  }
  startScroll = (evt) => {
    evt.persist();
    let size = Object.keys(this.props.timeAxisStore.axisData.data).length;
    size = size < 9 ? 9 : size;
    const scrollBarWrap = document.getElementById('scrollBarWrap');
    const scrollBar = document.getElementById('scrollBar');
    const scrollCon = document.getElementById('scrollCon');
    scrollBar.style.transition = 'none';
    scrollCon.style.transition = 'none';
    const barWrapWidth = scrollBarWrap.clientWidth;
    const barStep = 90 / (size - 9);
    const conStep = 1 / 9 * 100;
    const oldStep = this.currStep;
    document.onmousemove = (moveEvt) => {
      const distence = moveEvt.pageX - evt.pageX;
      this.currStep = oldStep + distence / (barWrapWidth * 0.9 / (size - 9));
      if (this.currStep < 0) {
        this.currStep = 0;
      }
      if (this.currStep > (size - 9)) {
        this.currStep = size - 9;
      }
      scrollBar.style.left = this.currStep * barStep + '%';
      scrollCon.style.left = -this.currStep * conStep + '%';
    };
    document.onmouseup = () => {
      scrollBar.style.transition = 'all 0.3s linear';
      scrollCon.style.transition = 'all 0.3s linear';
      document.onmouseup = null;
      document.onmousemove = null;
    };
  }
  render() {
    const moduleData = this.props.timeAxisStore.axisData.data;
    const sortedTime = Object.keys(moduleData).sort().reverse();
    const stockCode = this.props.bannerStore.bannerInfoData.stockCode;
    const labelConf = [
      {label: '工商信息', key: 'corp'},
      {label: '法务信息', key: 'legal'},
      {label: '新闻舆情', key: 'news'},
      {label: '经营信息', key: 'operation'},
      {label: '上市公告', key: 'stock', hide: !stockCode},
      {label: '团队信息', key: 'team'},
    ];
    const size = Object.keys(moduleData).length;
    return (
      <div className={styles.wrap}>
        <div className={styles.iconWrap}>
          <span className={styles.mainIcon}></span><span>主体公司</span>
          <span className={styles.relationIcon}></span><span>关联公司</span>
        </div>
        <div className={styles.lineWrap}>
          <div className={styles.labelWrap}>
            {this.createLabel(labelConf)}
            <div className={styles.eventTime}>事件时间</div>
          </div>
          <div id="scrollConWrap" className={styles.lineCon}>
            <div className={styles.scollConWrap}>
              <div
                id="scrollCon"
                className={styles.scrollCon}
                style={{width: sortedTime.length >= 9 ? sortedTime.length / 9 * 100 + '%' : '100%', transition: 'all .3s linear'}}
                >
                {this.createLine(sortedTime, labelConf, moduleData)}
              </div>
            </div>
            {size > 9 && <div id="scrollBarWrap" className={styles.barWrap}>
              <div id="scrollBar" style={{transition: 'all .3s linear'}} className={styles.scrollBar} onMouseDown={this.startScroll}></div>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.timeAxisStore.axisData.data === undefined ? true : false,
    error: props.timeAxisStore.axisData.error,
    module: '时间轴',
    height: 100,
  }),
})(observer(Axis));
