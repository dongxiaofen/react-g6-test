import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Footer from 'components/common/Footer';
import LoginForm from './loginForm';
import loginBg from 'imgs/login/loginBg.png';
function Login() {
  return (
    <div className={styles.login}>
      <div className={styles['login-bg']}>
        <img className={styles['login-img']} src={loginBg} alt=""/>
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}

export default observer(Login);
