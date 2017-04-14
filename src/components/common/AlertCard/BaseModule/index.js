import React, {PropTypes, Component} from 'react';
import { observer } from 'mobx-react';
import KeyValue from './KeyValue';
import {Col, Row} from 'components/common/Layout';
import DICT from 'config/Dict/reportModule';
import styles from './index.less';
@observer
export default class BaseModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  createLoading = () => {
    return this.props.loading ? <div className={styles.loading}><AnimateLoading animateCategory="1"/></div> : <span>{this.props.btnText}</span>;
  }
  createViewBtn = ()=> {
    const viewText = this.state.show ? '收起' : '展开';
    switch (this.props.module) {
      case 'double':
        return (
          <div>
            <div className={styles.viewBtn} onClick={this.viewFunc.bind(this)}>
              <span>{viewText}</span>
            </div>
            {
              this.state.show ?
              <div className={`${styles.viewBtn} ${styles.detail}`} onClick={this.props.viewDetCallback.bind(this, this.props.data.items)}>
                {this.createLoading()}
              </div>
              : ''
            }
          </div>);
      case 'detail':
        return (
          <div className={`${styles.viewBtn} ${styles.detail}`} onClick={this.props.viewDetCallback.bind(this, this.props.data.items)}>
            {
              this.props.loading ? <div className={styles.loading}><AnimateLoading animateCategory="1"/></div> : <span>{this.props.btnText}</span>
            }
          </div>);
      case 'none':
        return <span></span>;
      default:
        return (
          <div className={styles.viewBtn} onClick={this.viewFunc.bind(this)}>
            <span>{viewText}</span>
          </div>
        );
    }
  }
  viewFunc = () => {
    this.setState({
      show: !this.state.show,
    });
  }
  content(data) {
    const output = [];
    const config = this.state.show ? data.viewConfig : data.hideConfig;

    config.forEach((item, idx) => {
      const extraProps = {};
      if (item.url) {
        extraProps.url = data.items.getIn(['content', 'url']);
      }
      if (item.needHtmlParse) {
        extraProps.needHtmlParse = true;
      }
      if (item.backgroundClass) {
        extraProps.backgroundClass = item.backgroundClass;
      }
      let value = '';
      if (item.handleBlock) {
        value = item.handleBlock(data.items);
      } else if (item.handle) {
        value = item.handle(data.items.getIn(['content', item.key]));
        if (item.key === 'classificationNumbercname') {
          value = item.handle(data.items.getIn(['content', 'classificationNumber']));
        }
      } else {
        value = data.items.getIn(['content', item.key]);
        if (item.needBase64Parse) {
          extraProps.needBase64Parse = true;
        }
      }
      output.push(
        <Col key={idx} width={item.width} className={styles.col}>
          <KeyValue {...this.props} type={this.props.type} data={data.items}
            {...extraProps}
            theKey={DICT[data.dict][item.key]}
            theValue={value} />
        </Col>
      );
    });
    return output;
  }
  render() {
    return (
      <div id={this.props.animateId} className={styles.wrap}>
        <div className={styles.content}>
          <Row className={styles.row}>
            {this.content(this.props.data)}
          </Row>
          <Row>
            {this.state.show && this.props.contentHtml && this.props.contentHtml()}
          </Row>
        </div>
        <div className={`${styles.footer} clearfix`}>
          <div className={styles.date}>
            <span>{this.props.data.date.label}：</span>{this.props.data.date.value || '无'}
          </div>
          {this.createViewBtn()}
        </div>
      </div>
    );
  }
}

BaseModule.propTypes = {
  data: PropTypes.object,
  animateId: PropTypes.string,
  viewDetCallback: PropTypes.func,
  contentHtml: PropTypes.func,
  commonBoundAC: PropTypes.object,
  type: PropTypes.string,
  btnText: PropTypes.string,
  module: PropTypes.string, // default 一个展开按钮 double 查看按钮和展开按钮 detail 一个全文按钮 none 没哟按钮
  loading: PropTypes.bool,
};
BaseModule.defaultProps = {
  btnText: '全文',
  module: 'default',
}
