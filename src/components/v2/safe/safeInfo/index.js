import React, {Component, PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Clipboard from 'clipboard';
import { loadingComp } from 'components/hoc';
import {shieldInfo} from 'helpers/infoShield';
import { runInAction } from 'mobx';
import styles from './index.less';

@inject('safeStore', 'messageStore', 'modalStore')
@observer
class SafeCont extends Component {
  static propTypes = {
    modalStore: PropTypes.object,
    safeStore: PropTypes.object,
    messageStore: PropTypes.object,
  };
  componentDidMount() {
    const safeKey = this.props.safeStore.safeKey;
    safeKey.map(({key, title}) => {
      new Clipboard(`#${key}`).on('success', () => {
        this.props.messageStore.openMessage({type: 'info', content: `${title}复制成功`, duration: 3000});
      }).on('error', () => {
        this.props.messageStore.openMessage({type: 'warning', content: `${title}复制失败`, duration: 3000});
      });
    });
  }
  handleKeyShow = (idx) => {
    const isOpen = !!this.props.safeStore.safeDataOpen[idx];
    runInAction('open-close', () => {
      this.props.safeStore.safeDataOpen[idx] = !isOpen;
    });
  }
  clearPassword = () => {
    this.props.safeStore.updateValue('safe.password.value', '');
    this.props.safeStore.updateValue('safe.password.error', '');
  };
  resetApikey = () => {
    this.props.modalStore.openCompModal({
      // title: '私密修改',
      closeAction: this.clearPassword,
      isCustomize: true,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./reset'));
        });
      }
    });
  }

  createSafeCont = () => {
    const arr = this.props.safeStore.safeKey;
    const dataOpen = this.props.safeStore.safeDataOpen;
    const data = this.props.safeStore.safeData.data;
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
              {!!dataOpen[idx] ? <i className="fa fa-eye" aria-hidden="true"></i> : <i className="fa fa-eye-slash" aria-hidden="true"></i>}
              {!!dataOpen[idx] ? `隐藏${title}` : `显示${title}`}
            </div>
            {key === 'sharedSecret' ? <div className={styles['key-handle']} onClick={this.resetApikey.bind(this)}>重置密钥</div> : null}
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
    height: 200
  }),
})(SafeCont);
