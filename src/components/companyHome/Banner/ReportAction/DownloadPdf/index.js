import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Checkbox from 'antd/lib/checkbox';
import styles from './index.less';

@inject('routing', 'bannerStore')
@observer
export default class DownloadPdf extends Component {
  static propTypes = {
    bannerStore: PropTypes.object,
    routing: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      tipInfo: false,
      tipInfoFn: () => {
        const pdfDownloadConfig = this.props.bannerStore.pdfDownloadConfig;
        const levelOneHasTrue = pdfDownloadConfig.levelOne.every((item) => item.checked === false);
        const levelTwo = pdfDownloadConfig.levelTwo;
        const levelTwoKeys = Object.keys(levelTwo);
        const levelTwoBools = [];
        levelTwoKeys.forEach((key) => {
          const _levelTwo = levelTwo[key];
          levelTwoBools.push(_levelTwo.every((item) => item.checked === false));
        });
        const levelTwoHasTrue = levelTwoBools.every((item) => item === true);
        return levelOneHasTrue && levelTwoHasTrue;
      }
    };
  }

  downloadAll = (evt) => {
    if (evt.target.checked) { this.setState({ tipInfo: false }); }
    this.props.bannerStore.setDownloadAll(evt.target.checked);
  }

  downloadAllChecked() {
    const isAllChecked = this.props.bannerStore.isAllChecked;
    const stockCode = this.props.bannerStore.stockCode;
    const monitorId = this.props.routing.location.query.monitorId;
    const output = [];
    this.props.bannerStore.pdfDownloadConfig.levelOne.map((item) => {
      if (item.value === 'STOCK') {
        if (stockCode) {
          output.push(item.checked === true);
        }
      } else if (item.value === 'TAX') {
        if (monitorId) {
          output.push(item.checked === true);
        }
      } else {
        output.push(item.checked === true);
      }
      return output;
    });
    const levelOneChecked = output.every((item) => item === true);
    return isAllChecked || levelOneChecked;
  }

  menuLevelOneOnChange = (key, value, evt) => {
    if (evt.target.checked) { this.setState({ tipInfo: false }); }
    this.props.bannerStore.setPdfLevelOne(key, value, evt.target.checked);
  }

  menuLevelTwoOnChange = (levelOne, key, levelOneKey, evt) => {
    if (evt.target.checked) { this.setState({ tipInfo: false }); }
    this.props.bannerStore.setPdfLevelTwo(levelOne, key, levelOneKey, evt.target.checked);
  }

  menuLevelOne() {
    const checkComp = (item, key) => {
      return (
        <div className={`clearfix ${styles['download-item']}`} key={key}>
          <div className={styles['download-item-title']}>
            <Checkbox
              className={styles.checkbox_style}
              key={key}
              checked={item.checked}
              onChange={this.menuLevelOneOnChange.bind(this, key, item.value)}>
              {item.label}
            </Checkbox>
          </div>
          <div className="clearfix">
            {this.menuLevelTwo(item.value, key)}
          </div>
        </div>
      );
    };

    const output = [];
    const monitorId = this.props.routing.location.query.monitorId;
    const pdfDownloadConfig = this.props.bannerStore.pdfDownloadConfig;
    const levelOne = pdfDownloadConfig.levelOne;
    const stockCode = this.props.bannerStore.stockCode;
    levelOne.forEach((item, key) => {
      if (item.value === 'STOCK') {
        if (stockCode) {
          output.push(checkComp(item, key));
        }
      } else if (item.value === 'TAX') {
        if (monitorId) {
          output.push(checkComp(item, key));
        }
      } else {
        output.push(checkComp(item, key));
      }
    });
    return output;
  }

  menuLevelTwo(key, levelOneKey) {
    const checkComp = ({ _item, _idx, _key, _levelOneKey }) => {
      return (
        <div className={`clearfix ${styles['download-col-4']}`} key={_idx}>
          <div className={styles['download-item-title2']}>
            <Checkbox
              className={styles.checkbox_style}
              checked={_item.checked}
              onChange={this.menuLevelTwoOnChange.bind(this, _key, _idx, _levelOneKey)}>
              {_item.label}
            </Checkbox>
          </div>
        </div>
      );
    };
    const output = [];
    const monitorId = this.props.routing.location.query.monitorId;
    const levelTwo = this.props.bannerStore.pdfDownloadConfig.levelTwo[key];
    if (levelTwo.length) {
      levelTwo.forEach((item, idx) => {
        const argConfig = {
          _item: item,
          _idx: idx,
          _key: key,
          _levelOneKey: levelOneKey
        };
        if (item.value === 'TEAM_ANALYSIS') {
          if (monitorId) {
            output.push(checkComp(argConfig));
          }
        } else {
          output.push(checkComp(argConfig));
        }
      });
    }
    return output;
  }

  downloadPdf = () => {
    const findIndexLevelOneChecked = (key) => {
      const levelOne = this.props.bannerStore.pdfDownloadConfig.levelOne;
      const index = levelOne.findIndex((item) => item.value === key);
      return levelOne[index].checked;
    };
    const query = this.props.routing.location.query;
    const monitorId = query.monitorId;
    const reportId = query.reportId;
    let queryStr = '&type=';
    let queryArray = [];
    const bannerStore = this.props.bannerStore;
    // const levelOne = bannerStore.pdfDownloadConfig.levelOne;
    const levelTwo = bannerStore.pdfDownloadConfig.levelTwo;
    const levelTwoKeys = Object.keys(levelTwo);
    if (findIndexLevelOneChecked('SUMMARY')) {
      queryArray.push('SUMMARY');
    }
    if (findIndexLevelOneChecked('TAX')) {
      queryArray.push('TAX');
    }
    if (findIndexLevelOneChecked('NEWS')) {
      queryArray.push('NEWS');
    }
    levelTwoKeys.map((key) => {
      levelTwo[key].map((item) => {
        if (item.value === 'TEAM_ANALYSIS') {
          if (monitorId && item.checked) {
            queryArray.push(key);
            queryArray.push(item.value);
          }
        } else {
          if (item.checked) {
            queryArray.push(key);
            queryArray.push(item.value);
          }
        }
      });
    });
    queryArray = Array.from(new Set(queryArray));
    if (queryArray.length > 0) {
      this.setState({ tipInfo: false });
      queryStr = queryStr + queryArray.join(',');
      if (monitorId) {
        window.open(`/pdfDown?monitorId=${monitorId}${queryStr}`);
      }
      if (reportId) {
        window.open(`/pdfDown?reportId=${reportId}${queryStr}`);
      }
      this.props.bannerStore.clearPdfConfigChecked();
      this.props.bannerStore.setPdfDownloadKeys(queryArray);
    } else {
      this.setState({ tipInfo: true });
    }
    console.log(queryArray, '------queryArray');
  }

  render() {
    const isShowTipInfo = this.state.tipInfoFn();
    return (
      <div className={styles.downloadModal}>
        <div className={styles.downloadTitleBox}>
          <i className={`${styles.pdf_icon} fa fa-file-text-o`} aria-hidden="true"></i>
          <span>{this.props.bannerStore.companyName}贷前基础报告PDF下载（小米科技有限责任公司）</span>
        </div>
        <div className={styles.pdfDownModaBtnBox}>
          <div className={styles.selectAll}>
            <Checkbox
              className={styles.checkbox_style}
              checked={this.downloadAllChecked()}
              onChange={this.downloadAll}>
              全部信息
            </Checkbox>
            {
              this.state.tipInfo && isShowTipInfo
                ? <span className={styles['tip-info']}>请选择需要下载的板块</span>
                : null
            }
          </div>
          <div onClick={this.downloadPdf} className={styles.pdfDownModaBtn}>
            <i className="fa fa-download"></i>下载
          </div>
        </div>
        <div className={styles['download-content-box']}>
          {this.menuLevelOne()}
        </div>
      </div>
    );
  }
}
