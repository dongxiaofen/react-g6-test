import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
// import styles from './index.less';

function LinkJump({linkJumpStore, name, referer = 'other', className, label, children}) {
  // 点击后根据传人的公司名进行跳转报告或搜索
  const linkJump = () => {
    linkJumpStore.getCompanyExist(name, referer);
  };
  // 样式:不传入className 则显示默认样式
  // let style = '';
  // if (className) {
  //   style = className;
  // } else {
  //   style = styles.box;
  // }
  let content = label || name;
  if (children) {
    content = children;
  }
  return (
    <a onClick={linkJump.bind(this)} className={className}>{content}</a>
  );
}
LinkJump.propTypes = {
  linkJumpStore: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  referer: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
export default inject('linkJumpStore')((observer(LinkJump)));
