import React, { Component, PropTypes } from 'react';
import styles from './index.less';
import {HeaderNavBar} from 'components/index.js';
import solutionTop from 'imgs/solution/top.jpg';
import solution1 from 'imgs/solution/solution-1.png';
import solution2 from 'imgs/solution/solution-2.png';
import solution3 from 'imgs/solution/solution-3.png';

export default class SolutionBody extends Component {
  static propTypes = {
    login: PropTypes.object,
    client: PropTypes.object,
    commonBoundAC: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      isHeaderScroll: '',
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.refs.title.style.marginTop = 0;
      this.refs.title.style.opacity = 1;
      this.refs.sec1.style.marginLeft = 0;
      this.refs.sec1.style.opacity = 1;
      this.refs.sec1img.style.opacity = 1;
      this.refs.sec1img.style.marginLeft = 0;
      setTimeout(() => {
        this.refs.titleP.style.opacity = 1;
      }, 150);
    }, 50);
    const scrollTop_ = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    const height = document.all ? document.getElementsByTagName('html')[0].offsetHeight : window.innerHeight;
    if (Math.ceil((scrollTop_ + height - 360) / 406) === 2) {
      setTimeout(() => {
        this.refs.sec2.style.opacity = 1;
        this.refs.sec2.style.marginLeft = 0;
        this.refs.sec2img.style.marginLeft = 0;
        this.refs.sec2img.style.opacity = 1;
      }, 50);
    }
    if (Math.ceil((scrollTop_ + height - 360) / 406) >= 3) {
      setTimeout(() => {
        this.refs.sec2.style.opacity = 1;
        this.refs.sec2.style.marginLeft = 0;
        this.refs.sec2img.style.marginLeft = 0;
        this.refs.sec2img.style.opacity = 1;
        this.refs.sec3.style.marginLeft = 0;
        this.refs.sec3.style.opacity = 1;
        this.refs.sec3img.style.opacity = 1;
        this.refs.sec3img.style.marginLeft = 0;
      }, 51);
    }
    window.onscroll = () => {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      this.show(scrollTop);
      if (scrollTop >= 300) {
        this.setState({
          isHeaderScroll: '1',
        });
      } else {
        this.setState({
          isHeaderScroll: '',
        });
      }
    };
  }
  show = (scrollTop) => {
    const height = document.all ? document.getElementsByTagName('html')[0].offsetHeight : window.innerHeight;
    if (Math.ceil((scrollTop + height - 360) / 406) === 2) {
      this.refs.sec2.style.opacity = 1;
      this.refs.sec2.style.marginLeft = 0;
      this.refs.sec2img.style.marginLeft = 0;
      this.refs.sec2img.style.opacity = 1;
    }
    if (Math.ceil((scrollTop + height - 360) / 406) === 3) {
      this.refs.sec3.style.marginLeft = 0;
      this.refs.sec3.style.opacity = 1;
      this.refs.sec3img.style.opacity = 1;
      this.refs.sec3img.style.marginLeft = 0;
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <HeaderNavBar isHeaderScroll={this.state.isHeaderScroll} solution="1" {...this.props}/>
        <div className={styles.top}>
          <img src={solutionTop} />
          <h1 ref="title">大数据技术的创新应用</h1>
          <p ref="titleP">风险监控平台整合数据采集、数据挖掘、数据清洗、数据标准顶层设计和数据建模等大数据全产业链人才和金融专家团队，创新性地将机器学习、模式识别、文本算法、图像算法、关联规则、个性化推荐等大数据技术跨界用于金融行业，提供领先的金融大数据解决方案。</p>
        </div>
        <div className={styles['bgc-white']}>
          <div className={styles.section}>
            <div className={styles.left}>
              <img ref="sec1img" src={solution1}/>
            </div>
            <div ref="sec1" className={styles.right}>
              <h4>贷前征信<span>(针对信贷业务申请阶段)</span></h4>
              <p style={{marginTop: '24px'}}>拥有超过7500万个企业和数亿企业关联人的全息影像</p>
              <p>支持金融机构快速查询借贷企业工商、法务、新闻、人员、经营等多维度的数据分析报帮助金融机构有效识别虚假、不良、中介、过度授信等风险情况，规避风险</p>
            </div>
          </div>
        </div>
        <div className={styles['bgc-grey']}>
          <div className={styles.section} style={{ height: 406 }}>
            <div ref="sec2" className={styles.left} style={{width: '552px', padding: '120px 105px 130px 0px', opacity: '0', position: 'absolute', marginLeft: '105px'}}>
              <h4><span>(针对信贷业务放款阶段)</span>贷中复核</h4>
              <p style={{marginTop: '24px'}}>金融机构可通过创建监控，实时查看借贷企业</p>
              <p>及其关联企业、关联人的动态行为数据</p>
              <p>精准评估对象当前的风险水平，实现异常节点实时预警</p>
              <p>帮助金融机构及时发现风险，减少资金损失</p>
            </div>
            <div className={styles.right} style={{width: '420px', padding: '0px', opacity: '1', marginLeft: '552px'}}>
              <img ref="sec2img" src={solution2}/>
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.left}>
            <img ref="sec3img" src={solution3}/>
          </div>
          <div ref="sec3" className={styles.right}>
            <h4>贷后管理<span>(针对信贷业务完成后阶段)</span></h4>
            <p style={{marginTop: '24px'}}>金融机构根据自己的需要设定风险规则</p>
            <p>平台将根据这些规则为客户推送企业动态，并形成健康趋势图</p>
            <p>简化贷后管理工作，提升贷后管理效率，帮助金融机构及时发现企业异常，如：经营不力、财务恶化、信用下降……</p>
            <p>制定相应对策，消除坏账隐患</p>
          </div>
        </div>
      </div>
    );
  }
}

