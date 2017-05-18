import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function LinkJump({linkJumpStore, name, className}) {
  // 点击后根据传人的公司名进行跳转报告或搜索
  const linkJump = () => {
    linkJumpStore.getNameType(name);
  };
  // 样式:不传入className 则显示默认样式
  let style = '';
  if (className) {
    style = className;
  } else {
    style = styles.box;
  }
  return (
    <span onClick={linkJump.bind(this)} className={style}>
      {name}
    </span>
  );
}
LinkJump.propTypes = {
  linkJumpStore: PropTypes.object,
  name: PropTypes.string,
  className: PropTypes.string,
};
export default inject('linkJumpStore')((observer(LinkJump)));
