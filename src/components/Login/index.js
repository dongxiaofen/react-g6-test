import React, {PropTypes} from 'react';
import Button from 'components/lib/button';
import { observer, inject } from 'mobx-react';
import Input from 'components/lib/input';
import FormItem from 'components/lib/FormItem';
import styles from './index.less';
import { runInAction } from 'mobx';
import pathval from 'pathval';

import getPermissionMeta from 'helpers/getPermissionMeta';
import loginColse from 'imgs/login/loginColse.png';
import loginUser from 'imgs/login/loginUser.png';
import loginPwd from 'imgs/login/loginPwd.png';
import loginErr from 'imgs/login/loginErr.png';
import loginBrowserErr from 'imgs/login/loginBrowserErr.png';

function Login({loginStore, clientStore, pathname}) {
  // const isIE = (ver) => {
  //   const bTag = document.createElement('b');
  //   bTag.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
  //   return bTag.getElementsByTagName('i').length === 1;
  // }
  const handleSubmitOnKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      loginStore.handleSubmit(pathname);
    }
  };
  const changeValue = (event) => {
    runInAction('输入数据', () => {
      pathval.setPathValue(loginStore, `form.${event.target.id}.value`, event.target.value);
    });
    loginStore.resetVlidateStatus(event.target.id);
  };
  const resetVlidateStatus = (id) => {
    const validateStatus = pathval.getPathValue(loginStore, `form.${id}.validateStatus`);
    if (validateStatus !== 'success' || validateStatus !== 'init') {
      loginStore.resetVlidateStatus(id);
    }
  };
  const closeLoginOnClick = () => {
    runInAction('关闭登录框', () => {
      pathval.setPathValue(loginStore, 'isShowLogin', false);
    });
  };
  const errText = pathval.getPathValue(loginStore, 'errText');
  const isIE = pathval.getPathValue(loginStore, 'isIE');
  const envConfig = pathval.getPathValue(clientStore, 'envConfig');
  return (
    <div
      className={
        pathval.getPathValue(loginStore, 'isShowLogin') ?
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
          >
            <div className={styles.psInput}>
              <div className={styles.inputIconUser}>
                <img src={loginUser} alt=""/>
              </div>
              <Input
                id="username"
                type="text"
                placeholder="请输入用户名"
                value={pathval.getPathValue(loginStore, 'form.username.value')}
                onChange={changeValue}
                onFocus={resetVlidateStatus.bind(this, 'username')}
                className={styles.input}
                autoComplete={false}/>
            </div>
          </FormItem>
          <FormItem
            labelCol="0"
            wrapperCol="1"
          >
            <div className={styles.psInput}>
              <div className={styles.inputIconLock}>
                <img src={loginPwd} alt=""/>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={pathval.getPathValue(loginStore, 'form.password.value')}
                onChange={changeValue}
                onFocus={resetVlidateStatus.bind(this, 'password')}
                onKeyUp={handleSubmitOnKeyUp}
                className={styles.input}
                autoComplete={false}
              />
            </div>
          </FormItem>
          <div style={{ position: 'relative' }}>
            <div
              className={
                pathval.getPathValue(loginStore, 'isHasEorr') ?
                  `fs7 ${styles.errMessage} ${styles.isVisible}` :
                  `fs7 ${styles.errMessage}`
              }>
              <img src={loginErr} alt=""/>
              <span style={{ marginLeft: '6px' }}>
                  {errText}
                </span>
            </div>
            <Button
              onClick={loginStore.handleSubmit.bind(this, pathname)}
              className={`fs5 ${styles.submit}`}
              loading={pathval.getPathValue(loginStore, 'loading')}>
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

export default inject('loginStore', 'clientStore')(observer(Login));

