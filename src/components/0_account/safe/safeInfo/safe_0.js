import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Clipboard from 'clipboard';
import { loadingComp } from 'components/hoc';
import {shieldInfo} from 'helpers/infoShield';
import { runInAction } from 'mobx';
import openPic from 'imgs/open.png';
import styles from './index.less';

function SafeCont({accountStore, messageStore}) {
  const handleKeyShow = (idx) => {
    const isOpen = !!accountStore.safeDataOpen[idx];
    runInAction('open-close', () => {
      accountStore.safeDataOpen[idx] = !isOpen;
    });
  };
  const handleCopy = (text) => {
    window.clipboardData.setData('Text', text);
    messageStore.openMessage({type: 'info', content: '复制成功', duration: 5000});
  };
  const createSafeCont = () => {
    const arr = [{key: 'apikey', title: 'APIKEY'}, {key: 'sharedSecret', title: '密钥'}];
    const data = accountStore.safeData.data;
    const dataOpen = accountStore.safeDataOpen;
    return arr.map(({key, title}, idx) => {
      return (
        <div key={key} className={styles['safe-info']}>
          <div className={styles.title}>{title}:</div>
          <div className={styles['key-box']}>
            <span id={key}>{!!dataOpen[idx] ? data[key] : shieldInfo(data[key])}</span>
            <span className={styles.copy}>复制</span>
          </div>
          <div className={styles['key-handle']} onClick={handleKeyShow.bind(this, idx)}>
            <img src={openPic} />
            {!!dataOpen[idx] ? '隐藏key' : '显示key'}
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      {createSafeCont()}
    </div>
  );
}

SafeCont.propTypes = {
  accountStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 0,
    errCategory: 2,
    height: 400
  }),
})(inject('accountStore', 'messageStore')(observer(SafeCont)));
