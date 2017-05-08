import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';

import styles from './index.less';
import HoverBox from './HoverBox';

@inject('searchCompanyStore', 'clientStore')@observer
export default class NavAction extends Component {
  static propTypes = {
    clientStore: PropTypes.object,
    searchCompanyStore: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      inputValue: '',
    };
  }

  setFocus = (bool) => {
    const target = this.refs.searchBox;
    const preClass = target.className;
    let nextClass;
    if (bool) {
      nextClass = `${preClass} ${styles.searchBoxOnFocus}`;
    } else {
      const newPreClass = preClass.split(' ');
      newPreClass.pop();
      nextClass = newPreClass.join(' ');
    }
    target.className = nextClass;
    this.setState({
      focus: bool,
    });
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
            className={styles.searchInput}
            placeholder="请输入查询的公司..."
            value={this.state.inputValue}
            onFocus={this.setFocus.bind(this, true)}
            onBlur={this.setFocus.bind(this, false)}
            onKeyUp={this.enterToSearch}
            onChange={this.inputChange} />
          <span className={styles.searchIcon}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
        <div className={styles.menuBox} style={{ position: 'relative' }}>
          <span className={styles.downloadApp}>
            <i className="fa fa-code-fork" aria-hidden="true"></i>下载APP
          </span>
          <HoverBox width="100px" left="0px">
            <div className={styles.code}></div>
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
