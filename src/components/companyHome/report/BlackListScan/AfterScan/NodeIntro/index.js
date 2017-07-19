import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function NodeIntro({visible}) {
  console.log(visible, '----');
  const boxCss = visible ? styles.show : styles.hide;
  return (
    <div className={`${styles.box} ${boxCss}`}>
      <h3 className={styles.title}>网络明星点</h3>
      <div>
        <p>即在关联网络中<span>和很多公司节点都直接相连的点</span>，具体的连接数就是明星系数。</p>
        <p><span>明星系数</span>：节点在网络中直接影响的公司/个人数量；明星系数越高，节点直接影响力越高</p>
      </div>
      <h3 className={styles.title}>网络中心点</h3>
      <div>
        <p>即在关联网络中<span>处于中心的节点</span>，距离其他节点都比较近，中心系数100最高，0最低。</p>
        <p><span>中心系数</span>：以该节点为中心的聚集程度；中心系数越高，集团化程度越高。</p>
      </div>
      <h3 className={styles.title}>网络桥梁点</h3>
      <div>
        <p>即在关联网络中很多节点<span>相互之间的连接都会通过该点</span>，桥梁系数100最高，0最低。</p>
        <p><span>桥梁系数</span>：在该网络中，某节点对于整个网络相互连接的重要程度；桥梁点出问题，风险快速扩散。</p>
      </div>
      <h3 className={styles.title}>网络控制点</h3>
      <div>
        <p>即在关联网络中<span>和很多重要节点都有连接的点</span>，控制系数100最高，0最低。</p>
        <p><span>控制系数</span>：从投资、任职数量、质量及影响力上综合衡量该节点的重要程度；控制系数高的节点，往往是众多重要节点的幕后控制者。</p>
      </div>
    </div>
  );
}

NodeIntro.propTypes = {
  foo: PropTypes.string,
};
export default observer(NodeIntro);
