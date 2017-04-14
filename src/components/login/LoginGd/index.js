import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import FormItem from 'components/lib/FormItem';
import Input from 'components/lib/input';
import Button from 'components/lib/button';
import loginUser from 'imgs/login/loginUser.png';
import loginPwd from 'imgs/login/loginPwd.png';
import loginErr from 'imgs/login/loginErr.png';
import loginBrowserErr from 'imgs/login/loginBrowserErr.png';
import pathval from 'pathval';
import { runInAction } from 'mobx';

function LoginGd({loginStore}) {
  const errText = pathval.getPathValue(loginStore, 'errText');
  const isIE = pathval.getPathValue(loginStore, 'isIE');

  const changeValue = (event) => {
    runInAction('输入数据', () => {
      pathval.setPathValue(loginStore, `form.${event.target.id}.value`, event.target.value);
    });
    loginStore.resetVlidateStatus(event.target.id);
  };

  const handleSubmitOnKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      loginStore.handleSubmit();
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.headerContent + ' ' + 'clearfix'}>
          <div className={styles.headerImg}></div>
        </div>
      </div>
      <div className={styles.main}>
        <div
          className={`clearfix ${styles.loginBg} ${styles.isVisible}`}>
          <div id="login" className={`clearfix ${styles.login}`}>
            <div className={styles.loginForm}>
              <div className={styles.title}>
                <i></i>
                <span>用户登录</span>
              </div>
              <FormItem
                labelCol="0"
                wrapperCol="1"
                className={styles.formItem}>
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
                    onFocus={loginStore.resetVlidateStatus('username')}
                    className={styles.input}
                    autoComplete={false}
                  />
                </div>
              </FormItem>
              <FormItem
                labelCol="0"
                wrapperCol="1"
                className={styles.formItem}>
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
                    onFocus={loginStore.resetVlidateStatus('password')}
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
                  onClick={loginStore.handleSubmit}
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
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomContent}>
          <div className={styles.bottomSingle}>
            <div className={styles.bottomImg1}></div>
            <span>企业洞察</span>
          </div>
          <div className={styles.bottomSingle}>
            <div className={styles.bottomImg2}></div>
            <span>工商变更</span>
          </div>
          <div className={styles.bottomSingle}>
            <div className={styles.bottomImg3}></div>
            <span>法务公告</span>
          </div>
          <div className={styles.bottomSingle}>
            <div className={styles.bottomImg4}></div>
            <span>舆情新闻</span>
          </div>
          <div className={styles.bottomSingle}>
            <div className={styles.bottomImg5}></div>
            <span>经营信息</span>
          </div>
        </div>
        <div className={styles.bottomText}>
          中国电信股份有限公司广东分公司
        </div>
      </div>
    </div>
  );
}

LoginGd.propTypes = {
  foo: PropTypes.string,
};
export default inject('loginStore', 'clientStore')(observer(LoginGd));
