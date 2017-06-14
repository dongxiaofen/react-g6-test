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
      isShowShearchInput: false,
    };
  }

  onsSearchInputBlur = () => {
    if (this.state.inputValue === '') {
      this.setState({
        isShowShearchInput: false,
      });
    }
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

  userList = () => {
    const config = [
      {text: '我的收藏', handleClick: this.collection, icoClass: styles.collection},
      {text: '账号中心', handleClick: this.account, icoClass: styles.account},
      {text: '退出登录', handleClick: this.logout, icoClass: styles.logout},
    ];
    const output = [];
    config.forEach((item, idx) => {
      output.push(
        <div key={`userItem${idx}`} className={styles.userItem} onClick={item.handleClick}>
          <i className={item.icoClass}></i>{item.text}
        </div>
      );
    });
    return output;
  }

  userItemBoxMouseOver = () => {
    const parentItemRef = this.refs.userItemBox;
    const preClass = parentItemRef.className;
    const newClass = `${preClass} ${styles.userItemBoxHover}`;
    parentItemRef.className = newClass;
  }

  userItemBoxMouseOut = () => {
    const parentItemRef = this.refs.userItemBox;
    const preClass = parentItemRef.className;
    const newClass = preClass.split(' ')[0];
    parentItemRef.className = newClass;
  }

  changSearchInputState = (state) => {
    this.setState({
      isShowShearchInput: state,
    });
    if (state) {
      const searchInput = this.refs.searchInput;
      searchInput.focus();
    }
  }

  searchBar = () => {
    const className = this.state.isShowShearchInput ? styles.searchInputShow : styles.searchInputHidden;
    return (
      <div className={`clearfix ${styles.searchBox}`} ref="searchBox">
          <input
            ref="searchInput"
            placeholder="请输入查询的公司..."
            className={className}
            value={this.state.inputValue}
            onKeyUp={this.enterToSearch}
            onBlur={this.onsSearchInputBlur}
            onChange={this.inputChange} />
        <span className={styles.searchIcon} onClick={this.changSearchInputState.bind(this, true)}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
    );
  }

  render() {
    return (
      <div className={`clearfix ${styles.wrap}`}>
        {this.searchBar()}
        <div className={styles.menuBox}>
          <span className={styles.downloadApp}></span>
          <HoverBox width="140px" left="-50px">
            <div className={`clearfix ${styles.code}`}>
              <img src={codeImg} />
              <div className={styles.deving}>敬请期待</div>
              {/* <div className={styles.codeText}>下载星象应用</div> */}
            </div>
          </HoverBox>
        </div>
        <div className={styles.menuBox}
            ref="userItemBox"
            onMouseOver={this.userItemBoxMouseOver}
            onMouseOut={this.userItemBoxMouseOut}>
          <div className={styles.userIco}></div>
          <div className={styles.userItemBox}>
            <div className={styles.userItemBoxMain}>
              {this.userList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
