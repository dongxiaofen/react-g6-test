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
      tipInfo: false
    };
  }

  downloadAll = (evt) => {
    this.props.bannerStore.setDownloadAll(evt.target.checked);
  }

  downloadAllChecked() {
    const isAllChecked = this.props.bannerStore.isAllChecked;
    const stockCode = this.props.bannerStore.stockCode;
    const output = [];
    this.props.bannerStore.pdfDownloadConfig.levelOne.map((item) => {
      if (item.value === 'STOCK') {
        if (stockCode) {
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
    this.props.bannerStore.setPdfLevelOne(key, value, evt.target.checked);
  }

  menuLevelTwoOnChange = (levelOne, key, levelOneKey, evt) => {
    this.props.bannerStore.setPdfLevelTwo(levelOne, key, levelOneKey, evt.target.checked);
  }

  menuLevelOne() {
    const output = [];
    const pdfDownloadConfig = this.props.bannerStore.pdfDownloadConfig;
    const levelOne = pdfDownloadConfig.levelOne;
    const stockCode = this.props.bannerStore.stockCode;
    levelOne.forEach((item, key) => {
      if (item.value === 'STOCK') {
        if (stockCode) {
          output.push(
            <div className={`clearfix ${styles['download-item']}`} key={key}>
              <div className={styles['download-item-title']}>
                <Checkbox
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
        }
      } else {
        output.push(
          <div className={`clearfix ${styles['download-item']}`} key={key}>
            <div className={styles['download-item-title']}>
              <Checkbox
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
      }
    });
    return output;
  }

  menuLevelTwo(key, levelOneKey) {
    const output = [];
    const monitorId = this.props.routing.location.query.monitorId;
    const levelTwo = this.props.bannerStore.pdfDownloadConfig.levelTwo[key];
    if (levelTwo.length) {
      levelTwo.forEach((item, idx) => {
        if (item.value === 'TEAM_ANALYSIS') {
          if (monitorId) {
            output.push(
              <div className={`clearfix ${styles['download-col-4']}`} key={idx}>
                <div className={styles['download-item-title2']}>
                  <Checkbox
                    checked={item.checked}
                    onChange={this.menuLevelTwoOnChange.bind(this, key, idx, levelOneKey)}>
                    {item.label}
                  </Checkbox>
                </div>
              </div>
            );
          }
        } else {
          output.push(
            <div className={`clearfix ${styles['download-col-4']}`} key={idx}>
              <div className={styles['download-item-title2']}>
                <Checkbox
                  checked={item.checked}
                  onChange={this.menuLevelTwoOnChange.bind(this, key, idx, levelOneKey)}>
                  {item.label}
                </Checkbox>
              </div>
            </div>
          );
        }
      });
    }
    return output;
  }

  downloadPdf = () => {
    const query = this.props.routing.location.query;
    const monitorId = query.monitorId;
    const reportId = query.reportId;
    const analysisReportId = query.analysisReportId;
    let queryStr = '&type=';
    let queryArray = [];
    const bannerStore = this.props.bannerStore;
    const levelOne = bannerStore.pdfDownloadConfig.levelOne;
    const levelTwo = bannerStore.pdfDownloadConfig.levelTwo;
    const levelTwoKeys = Object.keys(levelTwo);
    if (levelOne[0].checked) {
      queryArray.push('SUMMARY');
    }
    if (levelOne[5].checked) {
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
      queryStr = queryStr + queryArray.join(',');
      if (monitorId) {
        window.open(`/pdfDown?monitorId=${monitorId}${queryStr}`);
      }
      if (reportId) {
        window.open(`/pdfDown?reportId=${reportId}${queryStr}`);
      }
      if (analysisReportId) {
        window.open(`/pdfDown?analysisReportId=${reportId}${queryStr}`);
      }
      this.props.bannerStore.clearPdfConfigChecked();
    } else {
      this.setState({ tipInfo: true });
    }
    console.log(queryArray, '------queryArray');
  }

  render() {
    return (
      <div className={styles.downloadModal}>
        <div className={styles.downloadTitleBox}>
          <i className="fa fa-drupal" aria-hidden="true"></i>
          <span>{this.props.bannerStore.companyName}</span>
        </div>
        <div className={styles.pdfDownModaBtnBox}>
          <div className={styles.selectAll}>
            <Checkbox
              checked={this.downloadAllChecked()}
              onChange={this.downloadAll}>
              全部页面
            </Checkbox>
            {
              this.state.tipInfo
                ? <span className={styles['tip-info']}>请选择需要下载的板块</span>
                : null
            }
          </div>
          <div onClick={this.downloadPdf} className={styles.pdfDownModaBtn}>下载</div>
        </div>
        <div className={styles['download-content-box']}>
          {this.menuLevelOne()}
        </div>
      </div>
    );
  }
}
