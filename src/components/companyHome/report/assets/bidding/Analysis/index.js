import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report/';
import Chart from './Chart';
import styles from './index.less';


class Analysis extends Component {
  componentDidMount() {
    this.props.assetsStore.modifyBiddingAnalysis();
  }


  menuActive = (text) => {
    if (text === this.props.assetsStore.biddingAnalysisActive) {
      return styles.menuTitleActive;
    }
    return '';
  };

  menuChange = (value) => {
    this.props.assetsStore.updateValue('biddingAnalysisActive', value);
  };

  render() {
    const assetsStore = this.props.assetsStore;
    return (
      <div>
        <div className="clearfix">
          <div className={styles.title}>
            <ModuleTitle module="招投标分析图" />
          </div>
          {
            !assetsStore.isErrAnalysis
              ?
              <div className={`cleafix ${styles.menu}`}>
                <div className={`${styles.menuTitle} ${this.menuActive('年度')}`} onClick={this.menuChange.bind(null, '年度')}>年度</div>
                <div className={`${styles.menuTitle} ${this.menuActive('季度')}`} onClick={this.menuChange.bind(null, '季度')}>季度</div>
                <div className={`${styles.menuTitle} ${this.menuActive('月度')}`} onClick={this.menuChange.bind(null, '月度')}>月度</div>
              </div>
              : null
          }
        </div>
        <Chart assetsStore={assetsStore} />
      </div>
    );
  }
}

Analysis.propTypes = {
  assetsStore: PropTypes.object,
};

export default observer(Analysis);
