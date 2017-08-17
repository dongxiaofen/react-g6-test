import React, {PropTypes, Component} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import CardHeader from './CardHeader';
import CardContent from './CardContent';
import CardFooter from './CardFooter';
@observer
export default class BaseModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  viewFunc = () => {
    this.setState({
      show: !this.state.show,
    });
  }
  viewReport = (mainMonitorId, type)=>{
    if (type === 'MAIN') {
      location.href = `/companyHome?monitorId=${mainMonitorId}&companyType=${type}`;
    }else {
      this.props.store.getMonitorMap(mainMonitorId);
    }
  };
  modifyDate = (date) => {
    if (!date) {
      return '无';
    }
    return date.split(' ')[0];
  }
  render() {
    const isModal = this.props.cardType === 'modal';
    const cssWrap = isModal ? styles.modalWrap : styles.wrap;
    const data = this.props.data;
    return (
      <div id={this.props.animateId} className={cssWrap}>
        <CardHeader
          data={this.props.data}
          hasSecondType={this.props.hasSecondType}
          cardType={this.props.cardType}
          modifyDate={this.modifyDate}/>
        {
          isModal && data.items.pattern === 'NEWS' ? '' : // 新闻弹窗不展示具体字段
          <CardContent
            data={this.props.data}
            module={this.props.module}
            show={this.state.show}
            contentHtml={this.props.contentHtml}
            isModal={isModal}/>
        }
        {
          isModal ? '' :
          <CardFooter
            data={data}
            show={this.state.show}
            loading={this.props.loading}
            type={this.props.type}
            viewFunc={this.viewFunc.bind(this)}
            viewDetCallback={this.props.viewDetCallback}
            btnText={this.props.btnText}
            modifyDate={this.modifyDate}/>
        }
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
  module: PropTypes.string, // 用于区分头条和时间轴
  hasSecondType: PropTypes.bool,
  cardType: PropTypes.string, // 用于区分是弹框还是网页
};
BaseModule.defaultProps = {
  btnText: '全文',
  type: 'default',
  module: 'headLine',
  hasSecondType: true,
  cardType: 'website'
};
