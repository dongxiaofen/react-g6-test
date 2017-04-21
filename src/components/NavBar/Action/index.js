import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import styles from './index.less';
import HoverBox from './HoverBox';

@observer
export class Action extends Component {
  static propTypes = {
    client: PropTypes.object,
    clientBoundAC: PropTypes.object,
    location: PropTypes.object,
    commonBoundAC: PropTypes.object,
    searchCompanyBoundAC: PropTypes.object,
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
    this.setState({
      showSetting: false,
    });
    this.props.clientBoundAC.logout();
  }

  inputChange = (evt) => {
    this.setState({
      inputValue: evt.target.value,
    });
  }

  enterToSearch = (evt) => {
    if (evt.keyCode === 13 && this.state.inputValue.trim() !== '') {
      this.props.commonBoundAC.updateValue(['searchKey'], evt.target.value, 'SEARCH_COMPANY_UPDATE_VALUE');
      this.props.searchCompanyBoundAC.searchCompany({ keyWord: evt.target.value, type: 'COMPANY_NAME' });
      this.props.searchCompanyBoundAC.showResult(true);
      browserHistory.push(`/searchCompany`);
    }
  }

  logoutMouseOver = () => {
    const logoutRef = this.refs.logoutRef;
    const preClass = logoutRef.className;
    const newClass = `${preClass} ${styles.logoutHover}`;
    logoutRef.className = newClass;
  }

  logoutMouseOut = () => {
    const logoutRef = this.refs.logoutRef;
    const newClass = logoutRef.className.split(' ')[0];
    logoutRef.className = newClass;
  }

  render() {
    const moduleData = this.props.client;
    const userEmail = moduleData.getIn(['userInfo', 'email']);
    const userName = moduleData.getIn(['userInfo', 'contact']);
    return (
      <div className={`clearfix ${styles.wrap}`}>
        <div className={`clearfix ${styles.searchBox}`} ref="searchBox">
          <input
            className={styles.searchInput}
            placeholder="请输入查询企业名称"
            value={this.state.inputValue}
            onFocus={this.setFocus.bind(this, true)}
            onBlur={this.setFocus.bind(this, false)}
            onKeyUp={this.enterToSearch}
            onChange={this.inputChange} />
          <span className={styles.searchIcon}></span>
        </div>
        <div className={styles.iconStyle}>
          <div className={`${styles.icon} ${styles.userInfoIcon}`}></div>
          <HoverBox width="230px" left="-100px">
            <div className={styles.userInfo}>
              <div className={styles.userInfoText}>欢迎您回来：{userName ? userName : '--'}</div>
              <div className={styles.userInfoBorder}></div>
              <div className={`clearfix ${styles.userInfoText}`}>
                <div className={styles.userInfoBlock}>账号：</div>
                <div className={styles.userInfoBlock}>{userEmail}</div>
              </div>
            </div>
          </HoverBox>
        </div>
        <div className={styles.iconStyle} onClick={this.logout}>
          <div className={`${styles.icon} ${styles.exitIcon}`}></div>
          <HoverBox width="66px" left="-26px">
            <div className={styles.logout}>
              <div className={styles.logoutText}>
                退出登录
              </div>
            </div>
          </HoverBox>
        </div>
      </div>
    );
  }
}
