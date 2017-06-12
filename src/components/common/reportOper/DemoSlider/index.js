import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import { Carousel } from 'antd';
function DemoSlider({imgs, navs, companyHomeStore}) {
  const createImgs = ()=> {
    const output = [];
    imgs.forEach((img, idx)=>{
      output.push(<div className={styles.demo} key={`demo${idx}`}><img src={img} alt="" /></div>);
    });
    return output;
  };
  const swiperDemo = (idx)=> {
    this.refs.demoSlider.refs.slick.slickGoTo(idx);
    companyHomeStore.updateValue('loanDemoAct', idx);
  };
  const createNavs = ()=> {
    const output = [];
    const width = `${(100.0 / navs.length)}%`;
    navs.forEach((nav, idx)=> {
      const navCss = companyHomeStore.loanDemoAct === idx ? styles.navAct : styles.nav;
      output.push(
        <p className={navCss}
          onClick={swiperDemo.bind(null, idx)}
          key={`nav${idx}`}
          style={{width: width}}>
          <span className={styles.navItem}>{nav}</span>
        </p>
      );
    });
    return output;
  };
  const beforeChangeHandle = (from, to)=>{
    companyHomeStore.updateValue('loanDemoAct', to);
  };
  return (
    <div className={styles.demoSlider}>
      <p className={styles.text}>样例轮播</p>
      <div className={styles.carousel}>
        <Carousel autoplay dots={false} ref="demoSlider" beforeChange={beforeChangeHandle}>
          {createImgs()}
        </Carousel>
      </div>
      <div className={styles.navWrap}>
        {createNavs()}
      </div>
    </div>
  );
}

DemoSlider.propTypes = {
  foo: PropTypes.string,
};
export default inject('companyHomeStore')(observer(DemoSlider));
