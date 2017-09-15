import React, {Component, PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Clipboard from 'clipboard';
import { loadingComp } from 'components/hoc';
import {shieldInfo} from 'helpers/infoShield';
import { runInAction } from 'mobx';
// import openPic from 'imgs/open.png';
import styles from './index.less';

@inject('accountStore', 'messageStore')
@observer
class SafeCont extends Component {
  static propTypes = {
    accountStore: PropTypes.object,
    messageStore: PropTypes.object,
  };
  componentDidMount() {
    const safeKey = this.props.accountStore.safe.safeKey;
    safeKey.map(({key, title}) => {
      new Clipboard(`#${key}`).on('success', () => {
        this.props.messageStore.openMessage({type: 'info', content: `${title}复制成功`, duration: 3000});
      }).on('error', () => {
        this.props.messageStore.openMessage({type: 'warning', content: `${title}复制失败`, duration: 3000});
      });
    });
  }

  handleKeyShow = (idx) => {
    const isOpen = !!this.props.accountStore.safe.safeDataOpen[idx];
    runInAction('open-close', () => {
      this.props.accountStore.safe.safeDataOpen[idx] = !isOpen;
    });
  }

  createSafeCont = () => {
    // const arr = [{key: 'apikey', title: 'APIKEY'}, {key: 'sharedSecret', title: '私钥'}];
    const arr = this.props.accountStore.safe.safeKey;
    const dataOpen = this.props.accountStore.safe.safeDataOpen;
    const data = this.props.accountStore.safe.safeData.data;
    if (data) {
      return arr.map(({key, title}, idx) => {
        return (
          <div key={key} className={styles['safe-info']}>
            <div className={styles.title}>{title}:</div>
            <div className={styles['key-box']}>
              <span>{!!dataOpen[idx] ? data[key] : shieldInfo(data[key])}</span>
              <span id={key} data-clipboard-text={data[key]} className={styles.copy}>复制</span>
            </div>
            <div className={styles['key-handle']} onClick={this.handleKeyShow.bind(this, idx)}>
              {/* <img src={openPic} /> */}
              {!!dataOpen[idx] ? <i className="fa fa-eye" aria-hidden="true"></i> : <i className="fa fa-eye-slash" aria-hidden="true"></i>}
              {!!dataOpen[idx] ? '隐藏key' : '显示key'}
            </div>
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div>
        {this.createSafeCont()}
      </div>
    );
  }
}

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 0,
    errCategory: 2,
    height: 400
  }),
})(SafeCont);
