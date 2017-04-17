import React, {PropTypes, Component} from 'react';
import { observer } from 'mobx-react';
import KeyValue from './KeyValue';
import {Col, Row} from 'components/common/Layout';
import DICT from 'config/Dict/reportModule';
import styles from './index.less';
import ALERT_CONFIG from 'config/Dict/alertCard';
import Grade from './Grade';
import CompanyName from './CompanyName'; // 报告时间轴才会有的组件，待测试
@observer
export default class BaseModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  // createLoading = () => {
  //   return this.props.loading ? <div className={styles.loading}><AnimateLoading animateCategory="1"/></div> : <span>{this.props.btnText}</span>;
  // }
  createViewBtn = ()=> {
    const viewText = this.state.show ? '收起' : '展开';
    switch (this.props.type) {
      case 'double':
        return (
          <div>
            <div className={styles.viewBtn} onClick={this.viewFunc.bind(this)}>
              <span>{viewText}</span>
            </div>
            {
              this.state.show ?
              <div className={`${styles.viewBtn} ${styles.detail}`} onClick={this.props.viewDetCallback.bind(this, this.props.data.items)}>
                {/* {this.createLoading()}*/}
              </div>
              : ''
            }
          </div>);
      case 'detail':
        return (
          <div className={`${styles.viewBtn} ${styles.detail}`} onClick={this.props.viewDetCallback.bind(this, this.props.data.items)}>
            {/* {
              this.props.loading ? <div className={styles.loading}><AnimateLoading animateCategory="1"/></div> : <span>{this.props.btnText}</span>
            }*/}
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
      let value = data.items.content[item.key];
      if (item.handleBlock) {
        value = item.handleBlock(data.items);
      } else if (item.handle) {
        value = item.handle(data.items.content[item.key]);
      }
      output.push(
        <Col key={idx} width={item.width} className={styles.col}>
          <KeyValue
            theKey={DICT[data.dict][item.key]}
            theValue={value} />
        </Col>
      );
    });
    return output;
  }
  viewReport = (mainMonitorId, type)=>{
    if (type === 'MAIN') {
      location.href = `/companyHome?monitorId=${mainMonitorId}&companyType=${type}`;
    }else {
      this.props.store.getMonitorMap(mainMonitorId);
    }
  };
  render() {
    const itemData = this.props.data.items;
    const rCompanyName = itemData.relatedMonitorCompanyName;
    const relation = rCompanyName && rCompanyName.length > 0 ? '关联' : '主体';
    const typeName = itemData.typeName || ALERT_CONFIG.cardsConfig[itemData.pattern];
    const companyType = relation === '关联' ? styles.relatedType : styles.mainType;
    const companyName = rCompanyName && rCompanyName.length > 0 ? rCompanyName : itemData.mainMonitorCompanyName;
    return (
      <div id={this.props.animateId} className={styles.wrap}>
        <div className={styles.top}>
          <div className={relation === '主体' ? styles.mainTitle : styles.relationTitle}>
            <span className={styles.typeName}>{typeName}</span>
            {relation === '主体' ? <Grade itemData={itemData} /> : ''}
          </div>
          {
            this.props.module === 'headLine' ? ''
            :
            <div className={styles.nameAndTimeWrap}>
              <div className={styles.companys}>
                <span className={companyType}>
                  <span>[</span>
                  <span className={styles.companyType}>{relation}</span>
                  <span>]</span>
                </span>
                <CompanyName item={itemData} companyName={companyName} />
              </div>
            </div>
          }
        </div>
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
  btnText: PropTypes.string,
  type: PropTypes.string, // default 一个展开按钮 double 查看按钮和展开按钮 detail 一个全文按钮 none 没哟按钮
  loading: PropTypes.bool,
  store: PropTypes.object,
  module: PropTypes.string,
};
BaseModule.defaultProps = {
  btnText: '全文',
  type: 'default',
  module: 'headLine'
};
