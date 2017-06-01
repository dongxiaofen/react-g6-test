import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';

import styles from './index.less';
import HoverBox from './HoverBox';
import codeImg from 'imgs/navbar/code.png';

@inject('searchCompanyStore', 'clientStore')@observer
export default class NavAction extends Component {
  static propTypes = {
    clientStore: PropTypes.object,
    searchCompanyStore: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  logout = () => {
    this.props.clientStore.loginOut();
  }

  inputChange = (evt) => {
    this.setState({
      inputValue: evt.target.value,
    });
  }

  enterToSearch = (evt) => {
    if (evt.keyCode === 13 && this.state.inputValue.trim() !== '') {
      const searchCompanyStore = this.props.searchCompanyStore;
      searchCompanyStore.searchTabClick('COMPANY_NAME');
      searchCompanyStore.searchChange(evt);
      searchCompanyStore.getCompanyList();
      browserHistory.push(`/searchCompany`);
    }
  }

  account() {
    browserHistory.push('/accountSetting');
  }

  collection() {
    browserHistory.push('/collection');
  }

  render() {
    return (
      <div className={`clearfix ${styles.wrap}`}>
        <div className={`clearfix ${styles.searchBox}`} ref="searchBox">
          <input
            placeholder="请输入查询的公司..."
            className={styles.searchInput}
            value={this.state.inputValue}
            onKeyUp={this.enterToSearch}
            onChange={this.inputChange} />
          <span className={styles.searchIcon}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
        <div className={styles.menuBox} style={{ position: 'relative' }}>
          <span className={styles.downloadApp}>
            <i className="fa fa-qrcode" aria-hidden="true"></i>下载APP
          </span>
          <HoverBox width="140px" left="-18px">
            <div className={`clearfix ${styles.code}`}>
              <img src={codeImg} />
              <div className={styles.codeText}>下载星象应用</div>
            </div>
          </HoverBox>
        </div>
        <div className={styles.menuBox}>
          <span onClick={this.account}>
            <i className="fa fa-user" aria-hidden="true"></i>账号
          </span>
          <span onClick={this.collection}>
            <i className="fa fa-star-o" aria-hidden="true"></i>收藏
          </span>
          <span onClick={this.logout}>
            <i className="fa fa-sign-out" aria-hidden="true"></i>退出
          </span>
        </div>
      </div>
    );
  }
}
