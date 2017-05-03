import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

@inject('bannerStore')
@observer
export default class UpdateHighOrDeep extends Component {
  static propTypes = {
    bannerStore: PropTypes.object
  }

  btnOnClick = (evt) => {
    const active = Number(evt.target.getAttribute('data-item'));
    const setUpdateHighOrDeep = this.props.bannerStore.setUpdateHighOrDeep;
    if (active === 1) {
      setUpdateHighOrDeep({
        active: active,
        pointText: '已选择高级查询报告',
        pointTextSub: '（包含快速查询报告数据，另有关联网络、上市、新闻、团队、经营数据）'
      });
    } else {
      setUpdateHighOrDeep({
        active: active,
        pointText: '已选择深度分析报告',
        pointTextSub: '（包含高级查询报告数据，另有企业税务分析、综合信息分析、预警分析）'
      });
    }
  }
  render() {
    const updateHighOrDeep = this.props.bannerStore.updateHighOrDeep;
    return (
      <div className={styles.wrap}>
        <div className={`clearfix ${styles.btnGroup}`}>
          <div className={updateHighOrDeep.active === 1 ? `${styles.btn} ${styles.active}` : styles.btn}
            onClick={this.btnOnClick}
            data-item={1}>
            高级查询报告
            <div className={styles.icon}></div>
          </div>
          <div className={updateHighOrDeep.active === 2 ? `${styles.btn} ${styles.active}` : styles.btn}
            onClick={this.btnOnClick}
            data-item={2}>
            深度分析报告
            <div className={styles.icon}></div>
          </div>
        </div>
        <div className={styles.text}>
          {updateHighOrDeep.pointText}
          <span className={styles.textSub}>{updateHighOrDeep.pointTextSub}</span>
        </div>
      </div>
    );
  }
}
