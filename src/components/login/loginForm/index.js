import React, {PropTypes} from 'react';
import Button from 'components/lib/button';
import { observer, inject } from 'mobx-react';
import Input from 'components/lib/input';
import FormItem from 'components/lib/FormItem';
import styles from './index.less';
import { runInAction } from 'mobx';
import pathval from 'pathval';
import __trim from 'lodash/trim';

import loginUser from 'imgs/login/loginUser.png';
import loginPwd from 'imgs/login/loginPwd.png';
import loginErr from 'imgs/login/loginErr.png';

function Login({ loginStore }) {
  const handleSubmitOnKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      loginStore.handleSubmit();
    }
  };
  const changeValue = (event) => {
    runInAction('输入数据', () => {
      pathval.setPathValue(loginStore, `form.${event.target.id}.value`, __trim(event.target.value));
    });
    loginStore.resetVlidateStatus(event.target.id);
  };
  const resetVlidateStatus = (id) => {
    const validateStatus = pathval.getPathValue(loginStore, `form.${id}.validateStatus`);
    if (validateStatus !== 'success' || validateStatus !== 'init') {
      loginStore.resetVlidateStatus(id);
    }
  };

  const errText = pathval.getPathValue(loginStore, 'errText');
  return (
    <div id="login" className={styles.login}>
      <h2 className={styles.title}>登录</h2>
      <div className={styles.loginForm}>
        <FormItem
          labelCol="0"
          wrapperCol="1"
        >
          <div className={styles.psInput}>
            <div className={styles.inputIconUser}>
              <img src={loginUser} alt=""/>
            </div>
            <span className={styles.textLine}></span>
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
            <span className={styles.textLine}></span>
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
        <div className={styles['btn-box']}>
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
            onClick={loginStore.handleSubmit.bind(this)}
            className={`fs5 ${styles.submit}`}
            loading={pathval.getPathValue(loginStore, 'loading')}>
            登 录
          </Button>
        </div>
      </div>
      <p className={styles.forget}>忘记密码，请联系客服　400-139-1819</p>
    </div>
  );
}

Login.propTypes = {
  foo: PropTypes.string,
};

export default inject('loginStore')(observer(Login));
