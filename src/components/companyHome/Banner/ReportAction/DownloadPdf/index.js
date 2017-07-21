import React, {Component, PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Checkbox from 'antd/lib/checkbox';
import styles from './index.less';
import { runInAction } from 'mobx';

@inject('routing', 'bannerStore', 'companyHomeStore', 'messageStore', 'clientStore', 'pdfStore')
@observer
export default class DownloadPdf extends Component {
  static propTypes = {
    bannerStore: PropTypes.object,
    routing: PropTypes.object,
    companyHomeStore: PropTypes.object,
    messageStore: PropTypes.object,
    clientStore: PropTypes.object,
    pdfStore: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      reportTypeDict: {monitor: '贷后监控', loan: '贷中分析', report: '贷前高级报告', 'basicReport': '贷前基础报告'},
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
  componentWillMount() {
    console.log(this.props.clientStore.userInfo);
    runInAction('设置用户邮箱', () => {
      this.props.companyHomeStore.emailAddress = this.props.clientStore.userInfo.contactEmail;
    });
  }

  getReportType = () => {
    const route = this.props.routing.location.pathname.split('/')[2];
    if (/comprehenEval|profitEval|operationEval|growthAbilityEval/.test(route)) {
      return 'loan';
    } else if (/monitorTimeAxis|monitorAlert/.test(route)) {
      return 'monitor';
    } else if (this.props.companyHomeStore.reportInfo.reportId) {
      return 'report';
    }
    return 'basicReport';
  };

  downloadAll = (evt) => {
    if (evt.target.checked) {
      this.setState({tipInfo: false});
    }
    this.props.bannerStore.setDownloadAll(evt.target.checked, this.getReportType());
  };

  downloadAllChecked() {
    const isAllChecked = this.props.bannerStore.isAllChecked;
    const stockCode = this.props.bannerStore.bannerInfoData.stockCode;
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
    if (evt.target.checked) {
      this.setState({tipInfo: false});
    }
    this.props.bannerStore.setPdfLevelOne(key, value, evt.target.checked, this.getReportType());
  };

  menuLevelTwoOnChange = (levelOne, key, levelOneKey, evt) => {
    if (evt.target.checked) {
      this.setState({tipInfo: false});
    }
    this.props.bannerStore.setPdfLevelTwo(levelOne, key, levelOneKey, evt.target.checked);
  };

  menuLevelOne() {
    const checkComp = (item, key) => {
      return (
        <div className={`clearfix ${styles['download-item']}`} key={key}>
          <div className={styles['download-item-title']}>
            <Checkbox
              style={{fontSize: '14px', color: '#424242'}}
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

    const stockCode = this.props.bannerStore.bannerInfoData.stockCode;
    const output = [];
    const pdfDownloadConfig = this.props.bannerStore.pdfDownloadConfig;
    const levelOne = pdfDownloadConfig.levelOne;
    levelOne.forEach((item, key) => {
      if (item.type === 'basicReport' && this.getReportType() === 'basicReport') {
        if (item.value === 'STOCK') {
          if (stockCode) {
            output.push(checkComp(item, key));
          }
        }else {
          output.push(checkComp(item, key));
        }
      } else if ((item.type === 'report' && item.type === this.getReportType()) || (item.type === 'basicReport' && this.getReportType() === 'report')) {
        if (item.value === 'STOCK') {
          if (stockCode) {
            output.push(checkComp(item, key));
          }
        }else {
          output.push(checkComp(item, key));
        }
      } else if (item.type === 'loan' && item.type === this.getReportType()) {
        output.push(checkComp(item, key));
      }
    });
    return output;
  }

  menuLevelTwo(key, levelOneKey) {
    const checkComp = ({_item, _idx, _key, _levelOneKey}) => {
      return (
        <div className={`clearfix ${styles['download-col-4']}`} key={_idx}>
          <div className={styles['download-item-title2']}>
            <Checkbox
              style={{fontSize: '13px', color: '#757575'}}
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
    const levelTwo = this.props.bannerStore.pdfDownloadConfig.levelTwo[key];
    if (levelTwo.length) {
      levelTwo.forEach((item, idx) => {
        const argConfig = {
          _item: item,
          _idx: idx,
          _key: key,
          _levelOneKey: levelOneKey
        };
        if (this.getReportType() === 'report') {
          output.push(checkComp(argConfig));
        } else if (this.getReportType() === 'loan') {
          this.props.companyHomeStore.reportInfo.dimensions.map( (words) => {
            if (item.value === words) {
              output.push(checkComp(argConfig));
            }
          });
        } else {
          if (this.getReportType() === 'basicReport' && item.value !== 'INV_POS_MANAGEMENT' && item.value !== 'INV_POS_SHAREHOLDER') {
            output.push(checkComp(argConfig));
          }
        }
      });
    }
    return output;
  }

  downloadPdf = () => {
    // 验证邮箱是否格式正确
    if (!/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.props.companyHomeStore.emailAddress)) {
      this.props.messageStore.openMessage({
        type: 'warning',
        content: '邮箱格式错误'});
      return;
    }
    const findIndexLevelOneChecked = (key) => {
      const levelOne = this.props.bannerStore.pdfDownloadConfig.levelOne;
      const index = levelOne.findIndex((item) => item.value === key);
      return levelOne[index].checked;
    };
    let queryArray = [];
    const bannerStore = this.props.bannerStore;
    const levelTwo = bannerStore.pdfDownloadConfig.levelTwo;
    const levelTwoKeys = Object.keys(levelTwo);
    if (findIndexLevelOneChecked('RISK_TAXATION')) {
      queryArray.push('RISK_TAXATION');
    }
    if (findIndexLevelOneChecked('NEWS')) {
      queryArray.push('NEWS');
    }
    if (findIndexLevelOneChecked('SUMMERY')) {
      queryArray.push('SUMMERY');
    }
    levelTwoKeys.map((key) => {
      levelTwo[key].map((item) => {
        if (item.checked) {
          // queryArray.push(key);
          queryArray.push(item.value);
        }
      });
    });
    queryArray = Array.from(new Set(queryArray));
    if (queryArray.length > 0) {
      this.setState({tipInfo: false});
      if (this.getReportType() === 'report') {
        this.props.pdfStore.sendEmail({
          reportId: this.props.companyHomeStore.reportInfo.reportId,
          types: queryArray.join(',')
        });
      }
      if (this.getReportType() === 'basicReport') {
        this.props.pdfStore.sendEmail({
          basicReportId: this.props.companyHomeStore.reportInfo.basicReportId,
          types: queryArray.join(',')
        });
      }
      if (this.getReportType() === 'loan') {
        this.props.pdfStore.sendEmail({
          analysisReportId: this.props.companyHomeStore.reportInfo.analysisReportId,
          types: queryArray.join(',')
        });
      }
      this.props.bannerStore.clearPdfConfigChecked();
      this.props.bannerStore.setPdfDownloadKeys(queryArray, this.getReportType());
    } else {
      this.setState({tipInfo: true});
    }
    console.log(queryArray, '------queryArray', this.getReportType());
  };

  inputEmail = (event) => {
    console.log(event.target.value);
    runInAction('修改邮箱', () => {
      this.props.companyHomeStore.emailAddress = event.target.value;
    });
  }
  render() {
    const isShowTipInfo = this.state.tipInfoFn();
    return (
      <div className={styles.downloadModal}>
        <div className={styles.downloadTitleBox}>
          <span className={styles.company_name}>{this.props.routing.location.query.companyName} </span>-
          <span> {this.state.reportTypeDict[this.getReportType()]}</span>
        </div>
        <div className={styles.pdfDownModaBtnBox}>
          <div className={styles.emil_tip}>接收报告邮箱<span className={styles.tips}>（已为您获取默认邮箱，其他邮箱接收请修改）</span></div>
          <div className={`${styles.email_box} clearfix`}>
            <label className={`${styles.input_box} pull-left`}>
              <input onChange={this.inputEmail} type="email" value={this.props.companyHomeStore.emailAddress} placeholder="请输入接收PDF的邮箱" />
            </label>
            <div className={`${styles.send_button} pull-left`} onClick={this.downloadPdf}>发送PDF报告</div>
          </div>
          <div className={styles.selectAll}>
            <span className={styles.down_tip}>下载内容</span>
            <Checkbox
              style={{fontSize: '14px'}}
              className={styles.checkbox_style}
              checked={this.downloadAllChecked()}
              onChange={this.downloadAll}>
              <span style={{fontSize: '14px', color: '#9e9e9e'}}>全选</span>
            </Checkbox>
            {
              this.state.tipInfo && isShowTipInfo
                ? <span className={styles['tip-info']}>请选择需要下载的板块</span>
                : null
            }
          </div>
        </div>
        <div className={styles['download-content-box']}>
          {this.menuLevelOne()}
        </div>
      </div>
    );
  }
}
