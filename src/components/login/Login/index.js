import React, {PropTypes} from 'react';
import { Button } from 'components/lib/button';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import pathval from 'pathval';
import md5 from 'crypto-js/md5';
import encHex from 'crypto-js/enc-hex';
import getPermissionMeta from 'helpers/getPermissionMeta';
import loginColse from 'imgs/login/loginColse.png';
import loginUser from 'imgs/login/loginUser.png';
import loginPwd from 'imgs/login/loginPwd.png';
import loginErr from 'imgs/login/loginErr.png';
import loginBrowserErr from 'imgs/login/loginBrowserErr.png';

function Login({loginStore, clientStore}) {
  const isIE = (ver) => {
    const bTag = document.createElement('b');
    bTag.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
    return bTag.getElementsByTagName('i').length === 1;
  }
  const handleSubmitOnKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSubmit();
    }
  }
  const handleSubmit = () => {
    const login = this.props.login;
    const keys = ['username', 'password'];
    let isSumbit = true;
    this.props.commonBoundAC.updateValue(['isHasEorr'], false, 'LOGIN_UPDATE_VALUE');
    keys.map((key)=>{
      if (login.getIn(['form', key, 'value']).length < 1) {
        isSumbit = false;
        this.props.commonBoundAC.updateValue(['form', key, 'validateStatus'], 'error', 'LOGIN_UPDATE_VALUE');
      } else {
        this.props.commonBoundAC.updateValue(['form', key, 'validateStatus'], 'success', 'LOGIN_UPDATE_VALUE');
      }
    });
    if (isSumbit) {
      const password = login.getIn(['form', 'password', 'value']);
      this.props.loginBoundAC.checkLogin(
        {
          email: login.getIn(['form', 'username', 'value']),
          password: encHex.stringify(md5(password))
        },
        this.props.location.pathname,
        this.props.history
      );
    } else {
      this.props.commonBoundAC.updateValue(
        ['isHasEorr'],
        true,
        'LOGIN_UPDATE_VALUE'
      );
      this.props.commonBoundAC.updateValue(
        ['errText'],
        '请输入用户名和密码',
        'LOGIN_UPDATE_VALUE'
      );
    }
  }
  const changeValue = (evt) => {
    this.props.commonBoundAC.updateValue(['form', evt.target.id, 'value'], evt.target.value, 'LOGIN_UPDATE_VALUE');
    this.resetVlidateStatus(evt.target.id);
  }
  const resetVlidateStatus = (id) => {
    const login = this.props.login;
    const validateStatus = login.getIn(['form', id, 'validateStatus']);
    if (validateStatus !== 'success' || validateStatus !== 'init') {
      this.props.loginBoundAC.resetVlidateStatus(id);
    }
  }
  const closeLoginOnClick = () => {
    this.props.commonBoundAC.updateValue(
      ['isShowLogin'],
      false,
      'LOGIN_UPDATE_VALUE'
    );
  }
  const errText = pathval.getPathValue(loginStore,'errText');
  const isIE = pathval.getPathValue(loginStore,'isIE');
  const envConfig = pathval.getPathValue(clientStore,'envConfig');
  return (
    <div
      className={
        pathval.getPathValue(loginStore,'isShowLogin') ?
          `clearfix ${styles.loginBg} ${styles.isVisible}` :
          `clearfix ${styles.loginBg}`
      }>
      <div id="login" className={`clearfix ${styles.login}`}>
        <div
          className={`clearfix ${styles.loginClose}`}
          onClick={closeLoginOnClick}>
          <img className={styles.loginColseImg} src={loginColse} alt=""/>
        </div>
        <div className={styles.loginLogo}>
          <div className={styles[getPermissionMeta(envConfig).loginLogoStyle]}>
            <img src={getPermissionMeta(envConfig).loginLogo} alt=""/>
          </div>
        </div>
        <div className={styles.loginForm}>
          <FormItem
            labelCol="0"
            wrapperCol="1"
            // help={login.getIn(['form', 'username', 'validateMsg'])}
            // validateStatus={login.getIn(['form', 'username', 'validateStatus'])}
            cssName={styles.formItem}>
            <div className={styles.psInput}>
              <div className={styles.inputIconUser}>
                <img src={loginUser} alt=""/>
              </div>
              <Input
                id="username"
                type="text"
                placeholder="请输入用户名"
                value={login.getIn(['form', 'username', 'value'])}
                validateStatus={
                  login.getIn(['form', 'username', 'validateStatus'])
                }
                help={login.getIn(['form', 'username', 'validateMsg'])}
                onChange={changeValue}
                onFocus={resetVlidateStatus.bind(this, 'username')}
                cssName={styles.input}
                autoComplete={false}/>
            </div>
          </FormItem>
          <FormItem
            labelCol="0"
            wrapperCol="1"
            // help={login.getIn(['form', 'password', 'validateMsg'])}
            // validateStatus={login.getIn(['form', 'password', 'validateStatus'])}
            cssName={styles.formItem}>
            <div className={styles.psInput}>
              <div className={styles.inputIconLock}>
                <img src={loginPwd} alt=""/>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={login.getIn(['form', 'password', 'value'])}
                validateStatus={
                  login.getIn(['form', 'password', 'validateStatus'])
                }
                help={login.getIn(['form', 'password', 'validateMsg'])}
                onChange={changeValue}
                onFocus={resetVlidateStatus.bind(this, 'password')}
                onKeyUp={handleSubmitOnKeyUp}
                cssName={styles.input}
                autoComplete={false}/>
            </div>
          </FormItem>
          <div style={{ position: 'relative' }}>
            <div
              className={
                login.get('isHasEorr') ?
                  `fs7 ${styles.errMessage} ${styles.isVisible}` :
                  `fs7 ${styles.errMessage}`
              }>
              <img src={loginErr} alt=""/>
              <span style={{ marginLeft: '6px' }}>
                  {errText}
                </span>
            </div>
            <Button
              onClick={handleSubmit}
              cssName={`fs5 ${styles.submit}`}
              loading={login.get('loading')}>
              登 录
            </Button>
            <div
              className={
                isIE ?
                  `clearfix ${styles.loginBrowser} ${styles.isVisible}` :
                  `clearfix ${styles.loginBrowser}`
              }>
              <div className={styles.loginBrowserErrImg}>
                <img src={loginBrowserErr} alt=""/>
              </div>
              <div className={styles.loginBrowserErr}>
                  <span className="fs7">
                    为了更好的体验，推荐使用<span className={styles.browerText}>谷歌/火狐</span>浏览器
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  foo: PropTypes.string,
};
export default inject('loginStore','clientStore')(observer(Login));
