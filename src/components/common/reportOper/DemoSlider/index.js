import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import Carousel from 'antd/lib/carousel';
function DemoSlider({imgs, autoplay}) {
  const createImgs = ()=> {
    const output = [];
    imgs.forEach((img, idx)=>{
      output.push(<div className={styles.demo} key={`demo${idx}`}><img src={img} alt="" /></div>);
    });
    return output;
  };
  // const swiperDemo = (idx)=> {
  //   this.refs.demoSlider.refs.slick.slickGoTo(idx);
  //   companyHomeStore.updateValue('loanDemoAct', idx);
  // };
  // const createNavs = ()=> {
  //   const output = [];
  //   const width = `${(100.0 / navs.length)}%`;
  //   navs.forEach((nav, idx)=> {
  //     const navCss = companyHomeStore.loanDemoAct === idx ? styles.navAct : styles.nav;
  //     output.push(
  //       <p className={navCss}
  //         onClick={swiperDemo.bind(null, idx)}
  //         key={`nav${idx}`}
  //         style={{width: width}}>
  //         <span className={styles.navItem}>{nav}</span>
  //       </p>
  //     );
  //   });
  //   return output;
  // };
  return (
    <div className={styles.demoSlider}>
      <div className={styles.carousel}>
        <Carousel autoplay={autoplay} ref="demoSlider" dotsClass={styles.dotNavs}>
          {createImgs()}
        </Carousel>
      </div>
      {/* <div className={styles.navWrap}>
        {createNavs()}
      </div>*/}
    </div>
  );
}

DemoSlider.propTypes = {
  foo: PropTypes.string,
};
export default inject('companyHomeStore')(observer(DemoSlider));
