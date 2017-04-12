import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { Link } from 'react-router';
import catgory from 'imgs/myHomePage/catgory.png';
import headImg from 'imgs/myHomePage/headImg.png';

function BaseInfo() {
  const isMain = true;
  const helloText = '你好';
  // const userInfo = '';
  return (
    <div className={`clearfix ${styles['base-info']}`}>
      <div className={`clearfix ${styles['base-info-item']}`}>
        <div className={styles['user-info-img']}>
          <img src={headImg} alt=""/>
        </div>
        <div className={styles['user-info1']}>
          <div className={styles['user-info1-name']}>{helloText}， '--'</div>
          <div className={`${isMain ? styles['user-info1-option'] : styles['user-info1-sub']}`}>
            <div className={`${styles['user-info1-catgory']}`}>
              <div className={styles['user-catgory-img']}>
                <img src={catgory} alt=""/>
              </div>
              <div className={styles['user-catgory-text']}>{isMain ? '主账号' : '子账号'}</div>
            </div>
            <div className={styles['user-info1-link']}>
              <Link to="/account">账户管理</Link>
            </div>
          </div>
          {
            isMain
              ?
              <div className={styles['remain-point']}>
                <span>剩余点数：</span>
                <span>0</span>
              </div>
              :
              <div style={{visibility: 'hidden'}}>--</div>
          }
        </div>
        <div className={styles['user-info1-round1']}></div>
        <div className={styles['user-info1-round2']}></div>
      </div>
      <div className={`clearfix ${styles['base-info-item']}`}>
        <div className={styles['user-info-mb20']}>
          <span className={styles['user-info-title']}>账号</span>
          <span
            title={'--'}
            className={`${styles['user-info-text']} ${styles['user-info-textSmall']}`}>
              --
            </span>
        </div>
        <div className={styles['user-info-mb20']}>
          <span className={styles['user-info-title']}>邮箱</span>
          <span
            title={'--'}
            className={`${styles['user-info-text']} ${styles['user-info-textSmall']}`}>
              --
            </span>
        </div>
        <div>
          <span className={styles['user-info-title']}>手机</span>
          <span className={styles['user-info-text']}>--</span>
        </div>
      </div>
      <div className={`clearfix ${styles['base-info-item']}`}>
        <div className={styles['user-info-mb20']}>
          <span className={styles['user-info-title']}>公司</span>
          <span className={styles['user-info-text']}>--</span>
        </div>
        <div className={styles['user-info-mb20']}>
          <span className={styles['user-info-title']}>部门</span>
          <span className={styles['user-info-text']}>--</span>
        </div>
        <div>
          <span className={styles['user-info-title']}>职位</span>
          <span className={styles['user-info-text']}>--</span>
        </div>
      </div>
    </div>
  );
}

BaseInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(BaseInfo);
