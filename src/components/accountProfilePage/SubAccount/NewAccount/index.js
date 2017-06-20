import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import NewAccountHeader from './NewAccountHeader';
import NewAccountBody from './NewAccountBody';

function NewAccount({accountProfileStore}) {
  const erroeModule = (code) => {
    if (code === 404210) {
      return '子账号最新预警企业（无子账号）';
    } else if (code === 404211) {
      return '我的账号最新预警企业（未创建）';
    } else if (code === 404231) {
      return '子账号最新预警账号（有子账号，未创建）';
    } else if (code === 404213) {
      return '我的账号综合评分最低企业（未创建）';
    }
    return '暂无信息';
  };
  const keyWords = (code) => {
    if (code === 404210) {
      return '账号中心';
    } else if (code === 404211) {
      return '搜索';
    } else if (code === 404231) {
      return '';
    } else if (code === 404213) {
      return '搜索';
    }
    return '';
  };
  const path = (code) => {
    if (code === 404210) {
      return '/accountSetting';
    } else if (code === 404211) {
      return '/search';
    } else if (code === 404231) {
      return '';
    } else if (code === 404213) {
      return '/search';
    }
  };
  const config = {
    data: accountProfileStore.subAccount10Data.data && accountProfileStore.subAccount10Data.data.length > 0 ? accountProfileStore.subAccount10Data.data : [],
    isLoading: accountProfileStore.newAccount10IsLoading,
    error: !accountProfileStore.subAccount10Data.data || accountProfileStore.subAccount10Data.length === 0,
    errorWords: keyWords(accountProfileStore.subAccount10Data.errorCode),
    module: erroeModule(accountProfileStore.subAccount10Data.errorCode),
    path: path(accountProfileStore.subAccount10Data.errorCode),
  };
  return (
    <div className={styles.newAcconut_box}>
      <NewAccountHeader />
      <div className={`${config.isLoading || config.error ? styles.padding_center : styles.newAccountBody_box }`}>
        <NewAccountBody {...config} />
      </div>
    </div>
  );
}

NewAccount.propTypes = {
  accountProfileStore: PropTypes.object,
};
export default inject('accountProfileStore')(observer(NewAccount));
