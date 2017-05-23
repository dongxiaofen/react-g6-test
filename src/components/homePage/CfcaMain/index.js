import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
// import HeaderNavBar from 'components/common/HeaderNavBar';
import CfcaHeaderNav from 'components/common/CfcaHeaderNav';
import CfcaFooter from 'components/common/CfcaFooter';

// import bannerShape1 from 'imgs/homePage/banner_shape1.png';
// import bannerShape2 from 'imgs/homePage/banner_shape2.png';

import homeBox1Img1 from 'imgs/homePage/home_box1_1_cfca.png';
import homeBox1Img2 from 'imgs/homePage/home_box1_2_cfca.png';
import homeBox1Img3 from 'imgs/homePage/home_box1_3_cfca.png';
import homeBox1Img4 from 'imgs/homePage/home_box1_4_cfca.png';
import homeBox1Img5 from 'imgs/homePage/home_box1_5_cfca.png';
import homeBox1Img6 from 'imgs/homePage/home_box1_6_cfca.png';
import homeBox1Img7 from 'imgs/homePage/home_box1_7_cfca.png';

import homeBox2Img1 from 'imgs/homePage/home_box2_1_cfca.png';
import homeBox2Img2 from 'imgs/homePage/home_box2_2_cfca.png';
import homeBox2Img3 from 'imgs/homePage/home_box2_3_cfca.png';
import homeBox2Img4 from 'imgs/homePage/home_box2_4_cfca.png';

// import homeLogo from 'imgs/homePage/home_logo.png';
// import bannerArrow from 'imgs/homePage/home_banner_arrow.png';

function CfcaMain({isHeaderScroll}) {
  return (
    <div>
      {/* <HeaderNavBar isHeaderScroll={isHeaderScroll} home="1" /> */}
      <CfcaHeaderNav isHeaderScroll={isHeaderScroll} home="1" />
      <div id="home-banner" className={`clearfix ${styles['home-banner']}`}>
        <canvas id="canvas" className={styles.webGL}></canvas>
        <h1 id="home-banner-title">定制化风险决策平台&nbsp;&nbsp;用数据连接管理</h1>
        <p id="home-banner-txt1">集合移动互联网、大数据、云计算的前沿技术，专注企业情报信息采集与清洗，企业经营风险识别模型优化，个性风险规则自定义设计，</p>
        <p id="home-banner-txt2">为金融机构信贷管理提供全方位解决方案。</p>
        {/* <div className={styles['banner-shape']}>
          <div className={styles['banner-shape-img1']}>
            <img src={bannerShape1} alt=""/>
          </div>
          <div className={styles['banner-shape-img2']}>
            <img src={bannerShape2} alt=""/>
          </div>
          <div className={styles['banner-shape-img3']}>
            <img src={bannerShape2} alt=""/>
          </div>
          <div className={styles['banner-shape-img4']}>
            <img src={bannerShape2} alt=""/>
          </div>
          <div className={styles['banner-shape-img5']}>
            <img src={bannerShape2} alt=""/>
          </div>
          <div className={styles['banner-shape-text']}>
            <img src={homeLogo} alt=""/>
          </div>
        </div>
        <div className={styles['banner-arrow']}>
          <img
            className={styles['banner-arrow-img']}
            onClick={arrowOnClick}
            src={bannerArrow} />
        </div> */}
      </div>
      <div id="home-box1" className={styles['home-box1']}>
        <div className="container">
          <div id="home-box1-txt" className={styles['home-box1-txt']}>
            <p className={`${styles['box-title']} ${styles['title-cfca']}`}>专业高效的风险管理产品</p>
            <p className={styles['box-content']}>提供全方位企业信息查询、风险监控、风险分析、风险预警、风险管理等一体化服务，解决金融机构在收集企业信息效率低，风险评估信息批量处</p>
            <p className={styles['box-content']}>理难度大、贷后管理滞后、预警不及时等问题。</p>
          </div>
          <ul id="home-box1-icon" className={`clearfix ${styles['home-box1-content']}`}>
            <li>
              <div className={styles['home-box1-img']}>
                <img src={homeBox1Img1} alt=""/>
              </div>
              <p className={styles['box1-content-title']}>快速查询</p>
              <p className={styles['box1-content-txt']}>一键获取企业画像</p>
              <div className={styles['box1-relative1']}>
                <img src={homeBox1Img6} alt=""/>
              </div>
            </li>
            <li>
              <div className={styles['home-box1-img']}>
                <img src={homeBox1Img2} alt=""/>
              </div>
              <p className={styles['box1-content-title']}>实时监控</p>
              <p className={styles['box1-content-txt']}>追捕异常蛛丝马迹</p>
              <div className={styles['box1-relative2']}>
                <img src={homeBox1Img7} alt=""/>
              </div>
            </li>
            <li>
              <div className={styles['home-box1-img']}>
                <img src={homeBox1Img3} alt=""/>
              </div>
              <p className={styles['box1-content-title']}>关联分析</p>
              <p className={styles['box1-content-txt']}>深度挖掘潜在风险</p>
              <div className={styles['box1-relative1']}>
                <img src={homeBox1Img6} alt=""/>
              </div>
            </li>
            <li>
              <div className={styles['home-box1-img']}>
                <img src={homeBox1Img4} alt=""/>
              </div>
              <p className={styles['box1-content-title']}>风险预警</p>
              <p className={styles['box1-content-txt']}>即时推送异常警告</p>
              <div className={styles['box1-relative2']}>
                <img src={homeBox1Img7} alt=""/>
              </div>
            </li>
            <li>
              <div className={styles['home-box1-img']}>
                <img src={homeBox1Img5} alt=""/>
              </div>
              <p className={styles['box1-content-title']}>智能管理</p>
              <p className={styles['box1-content-txt']}>全面提升工作效率</p>
            </li>
          </ul>
        </div>
      </div>
      <div id="home-box2" className={styles['home-box2']}>
        <div id="home-box2-txt" className={styles['home-box2-txt']}>
          <p className={`${styles['box-title']} ${styles['title-cfca']}`}>前沿领先的大数据技术</p>
          <p className={styles['box-content']}>平台采用具备全球领先水平的开源技术作为研发的基础和支撑，从海量数据收集，到数据清洗整理，数据建模分析，数据可视化处理，我们的数据科</p>
          <p className={styles['box-content']}>学家团队均有自己独到的见解和领先的技术能力。</p>
        </div>
        <div className={styles['home-box2-content']}>
          <div id="box2-content-block1" className={`clearfix ${styles['box2-content-block1']}`}>
            <div className={styles['box2-content-itemL']}>
              <div className={styles['box2-item-img']}>
                <img src={homeBox2Img1} alt=""/>
              </div>
              <p className={styles['box2-item-title']}>数据采集</p>
              <p className={styles['box2-item-txt']}>通过部署分布式爬虫引擎和对接权威数据接口，实现全量大数据采集，并且去杂，去重，整合后入库。</p>
            </div>
            <div className={styles['box2-content-itemL']}>
              <div className={styles['box2-item-img']}>
                <img src={homeBox2Img2} alt=""/>
              </div>
              <p className={styles['box2-item-title']}>深度挖掘</p>
              <p className={styles['box2-item-txt']}>深度分析企业关联网络，计算出风险传导路径，突出异常节点，将风险事件序列化，形成企业健康趋势。</p>
            </div>
            <div className={styles['box2-content-itemL']}>
              <div className={styles['box2-item-img']}>
                <img src={homeBox2Img3} alt=""/>
              </div>
              <p className={styles['box2-item-title']}>机器学习</p>
              <p className={styles['box2-item-txt']}>独立研发MaaS系统，根据用户提交的数据处理请求，匹配最优算法。同时，系统具备自学习、自优化能力。</p>
            </div>
            <div className={styles['box2-content-itemL']}>
              <div className={styles['box2-item-img']}>
                <img src={homeBox2Img4} alt=""/>
              </div>
              <p className={styles['box2-item-title']}>可视化处理</p>
              <p className={styles['box2-item-txt']}>数据分析结果可视化处理，支持多种类型图表、终端页面展示，让数据说话。</p>
            </div>
          </div>
          <div id="box2-content-block2" className={`clearfix ${styles['box2-content-block2']}`}>
            {/* <div className={styles['box2-content-itemL']}>
              <div className={styles['box2-item-img']}>
                <img src={homeBox2Img3} alt=""/>
              </div>
              <p className={styles['box2-item-title']}>机器学习</p>
              <p className={styles['box2-item-txt']}>独立研发MaaS系统，根据用户提交的数据处理请求，匹配最优算法。同时，系统具备自学习、自优化能力。</p>
            </div>
            <div className={styles['box2-content-itemR']}>
              <div className={styles['box2-item-img']}>
                <img src={homeBox2Img4} alt=""/>
              </div>
              <p className={styles['box2-item-title']}>可视化处理</p>
              <p className={styles['box2-item-txt']}>数据分析结果可视化处理，支持多种类型图表、终端页面展示，让数据说话。</p>
            </div> */}
          </div>
        </div>
      </div>
      <CfcaFooter />
    </div>
  );
}

CfcaMain.propTypes = {
  isHeaderScroll: PropTypes.bool,
};
export default observer(CfcaMain);
