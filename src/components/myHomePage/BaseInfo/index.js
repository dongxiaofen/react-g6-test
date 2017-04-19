import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { Link } from 'react-router';
import catgory from 'imgs/myHomePage/catgory.png';
import headImg from 'imgs/myHomePage/headImg.png';
import pathval from 'pathval';
import moment from 'moment';

function BaseInfo({ clientStore }) {
  console.log(pathval.getPathValue(clientStore, 'userInfo'));
  const isMain = pathval.getPathValue(clientStore, 'userInfo.root');
  const nowHour = moment().hour();
  let helloText = '';
  if (nowHour >= 0 && nowHour < 5) {
    helloText = '凌晨好';
  } else if (nowHour >= 5 && nowHour < 7) {
    helloText = '清晨好';
  } else if (nowHour >= 7 && nowHour < 9) {
    helloText = '早上好';
  } else if (nowHour >= 9 && nowHour < 11) {
    helloText = '上午好';
  } else if (nowHour >= 11 && nowHour < 13) {
    helloText = '中午好';
  } else if (nowHour >= 13 && nowHour < 17) {
    helloText = '下午好';
  } else if (nowHour >= 17 && nowHour < 19) {
    helloText = '傍晚好';
  } else if (nowHour >= 19 && nowHour < 24) {
    helloText = '晚上好';
  }
  const userInfo = pathval.getPathValue(clientStore, 'userInfo');
  return (
    <div className={`clearfix ${styles['base-info']}`}>
      <div className={`clearfix ${styles['base-info-item']}`}>
        <div className={styles['user-info-img']}>
          <img src={headImg} alt=""/>
        </div>
        <div className={styles['user-info1']}>
          <div className={styles['user-info1-name']}>{helloText}，{userInfo.contact ? userInfo.contact : '--'}</div>
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
                <span>{pathval.getPathValue(clientStore, 'userInfo.point') ? pathval.getPathValue(clientStore, 'userInfo.point') : 0}</span>
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
            title={pathval.getPathValue(clientStore, 'userInfo.email') ? pathval.getPathValue(clientStore, 'userInfo.email') : '--'}
            className={`${styles['user-info-text']} ${styles['user-info-textSmall']}`}>
            {pathval.getPathValue(clientStore, 'userInfo.email') ? pathval.getPathValue(clientStore, 'userInfo.email') : '--'}
            </span>
        </div>
        <div className={styles['user-info-mb20']}>
          <span className={styles['user-info-title']}>邮箱</span>
          <span
            title={pathval.getPathValue(clientStore, 'userInfo.contactEmail') ? pathval.getPathValue(clientStore, 'userInfo.contactEmail') : '--'}
            className={`${styles['user-info-text']} ${styles['user-info-textSmall']}`}>
            {pathval.getPathValue(clientStore, 'userInfo.contactEmail') ? pathval.getPathValue(clientStore, 'userInfo.contactEmail') : '--'}
            </span>
        </div>
        <div>
          <span className={styles['user-info-title']}>手机</span>
          <span className={styles['user-info-text']}>{pathval.getPathValue(clientStore, 'userInfo.phone') ? pathval.getPathValue(clientStore, 'userInfo.phone') : '--'}</span>
        </div>
      </div>
      <div className={`clearfix ${styles['base-info-item']}`}>
        <div className={styles['user-info-mb20']}>
          <span className={styles['user-info-title']}>公司</span>
          <span className={styles['user-info-text']}>{pathval.getPathValue(clientStore, 'userInfo.companyName') ? pathval.getPathValue(clientStore, 'userInfo.companyName') : '--'}</span>
        </div>
        <div className={styles['user-info-mb20']}>
          <span className={styles['user-info-title']}>部门</span>
          <span className={styles['user-info-text']}>{pathval.getPathValue(clientStore, 'userInfo.department') ? pathval.getPathValue(clientStore, 'userInfo.department') : '--'}</span>
        </div>
        <div>
          <span className={styles['user-info-title']}>职位</span>
          <span className={styles['user-info-text']}>{pathval.getPathValue(clientStore, 'userInfo.contactPosition') ? pathval.getPathValue(clientStore, 'userInfo.contactPosition') : '--'}</span>
        </div>
      </div>
    </div>
  );
}

BaseInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('clientStore')(observer(BaseInfo));
