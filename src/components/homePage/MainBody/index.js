import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import pathval from 'pathval';
import { runInAction } from 'mobx';

import fhtLogo from 'imgs/main/fht_logo.png';
import dxLogo from 'imgs/main/dx_logo.png';
import banner1Text from 'imgs/main/banner1_text.png';
import banner2Img from 'imgs/main/banner2_img.png';
import banner3Img from 'imgs/main/banner3_img.png';
import banner4Icon1 from 'imgs/main/icon1.png';
import banner4Icon2 from 'imgs/main/icon2.png';
import banner4Icon3 from 'imgs/main/icon3.png';
import banner4Icon4 from 'imgs/main/icon4.png';
import getPermissionMeta from 'helpers/getPermissionMeta';

function MainBody({clientStore, loginStore}) {
  const envConfig = pathval.getPathValue(clientStore, 'envConfig');
  const logoOutput = [];

  const showLoginOnClick = () => {
    runInAction('显示登录框', () => {
      pathval.setPathValue(loginStore, 'isShowLogin', true);
    });
  };

  const showDownloadOnClick = () => {
    document.getElementById('download-box').style.display = 'block';
  };

  if (envConfig === 'dianxin_prod') {
    logoOutput.push(
      <div className={`clearfix ${styles['header-logo']}`}>
        <div className={styles['header-logo-dx']}>
          <img src={dxLogo} alt=""/>
        </div>
        <div className={styles['header-logo-fht']}>
          <img src={fhtLogo} alt=""/>
        </div>
      </div>
    );
  } else {
    logoOutput.push(
      <div className={`clearfix ${styles['header-logo']}`}>
        <div
          className={styles['header-logo-fht']}
          style={{marginLeft: 0}}>
          <img src={fhtLogo} alt=""/>
        </div>
      </div>
    );
  }
  return (
    <div className={`clearfix ${styles['max-container']}`}>
      <div className={styles.header}>
        <div className={`clearfix ${styles.container}`}>
          {logoOutput}
          <div className={styles['header-btn']}>
            <button
              className={`fs5 ${styles['header-btn-style']} ${styles['header-download-btn']}`}
              onClick={showDownloadOnClick}>
              下载APP
            </button>
            <button
              className={`fs5 ${styles['header-btn-style']}`}
              onClick={showLoginOnClick}>
              快速登录
            </button>
          </div>
        </div>
      </div>
      <div className={styles.banner1}>
        <div className="container">
          <div className={styles['banner1-text']}>
            <img src={banner1Text} alt=""/>
          </div>
        </div>
      </div>
      <div className={styles.banner2}>
        <div className="clearfix container">
          <div className={styles['banner2-img']}>
            <img src={banner2Img} alt=""/>
          </div>
          <div className={styles['banner2-text']}>
            <h2 className={`fs0 ${styles['main-title']}`}>提升深层次</h2>
            <h2 className={`fs0 ${styles['main-title']}`}>信息收集效率</h2>
            <div className={`fs5 ${styles['main-content']}`}>
              <p>
                分布式全网
                <span className={styles['main-content-light']}>
                    信息收集
                  </span>、
                <span className={styles['main-content-light']}>
                    数据清洗
                  </span>、
                <span className={styles['main-content-light']}>
                    机器学习
                  </span>
              </p>
              <p>
                以及
                <span className={styles['main-content-light']}>
                    行业分析完成企业
                  </span>
                或
                <span className={styles['main-content-light']}>
                    个人的风险信
                  </span>
                息展示与评估
              </p>
              <p>产品包含数千个数据源</p>
              <p>
                并累计拥有超过
                <span className={styles['main-content-light']}>
                    7500万个企业
                  </span>
                和
                <span className={styles['main-content-light']}>
                    数亿企业关联人的全息影像
                  </span>
              </p>
              <p>让金融从业人员能够从繁琐的数据收集工作中解脱出来</p>
              <p>将更多的时间和精力放在专业的数据分析上</p>
              <p>从而产生更大的价值</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.banner3}>
        <div className="clearfix container">
          <div className={styles['banner3-text']}>
            <h2 className={`fs0 ${styles['main-title']}`}>实时监控</h2>
            <h2 className={`fs0 ${styles['main-title']}`}>全网最新信息</h2>
            <div className={`fs5 ${styles['main-content']}`}>
              <p>通过对监控企业及其关联企业每天的动态行为</p>
              <p>执行长期可靠的数据采集及事件分析</p>
              <p>精准评估对象当前风险水平的同时，实现风险信息实时预警</p>
              <p>
                  <span className={styles['main-content-light']}>
                    风险信息即时推送
                  </span>
                到客户移动端或PC端
              </p>
              <p>不但提高风控人员的效率，更能挖掘关联网络中潜在风险信号</p>
              <p>
                实现
                <span className={styles['main-content-light']}>
                    全面深度的贷后／投后／在保监控
                  </span>
              </p>
            </div>
          </div>
          <div className={styles['banner3-img']}>
            <img src={banner3Img} alt=""/>
          </div>
        </div>
      </div>
      <div className={styles.banner4}>
        <div className="clearfix container">
          <div className={styles['banner4-text']}>
            <h2 className={`fs0 ${styles['main-title']}`}>
              定制化风险管理决策中心
            </h2>
            <div className={`fs5 ${styles['main-content']}`}>
              <p>
                深度挖掘投资、上下游、合作等关联关系，全面便捷的管理和呈现企业客户及其关联企业的风险信息
              </p>
              <p>
                同时平台集成了
                <span className={styles['main-content-light']}>
                    全网定向监控系统及大数据分析工具
                  </span>
                ，能够实时采集推送企业客户的
                <span className={styles['main-content-light']}>行为变化</span>
                、
                <span className={styles['main-content-light']}>舆情等信息</span>
                ，并利用文本分析、机器学习、序列分析等工具
              </p>
              <p>
                  <span className={styles['main-content-light']}>
                    建立风险模型
                  </span>，
                <span className={styles['main-content-light']}>
                    实现动态预警
                  </span>，从而控制敞口风险，稳定资产质量，增强金融机构的核心竞争力
              </p>
            </div>
          </div>
          <div className={`clearfix ${styles['banner4-img']}`}>
            <div className={styles['banner4-img-box']}>
              <div>
                <img src={banner4Icon1} alt=""/>
              </div>
              <p className="fs5">工商变更</p>
            </div>
            <div className={styles['banner4-img-box']}>
              <div>
                <img src={banner4Icon2} alt=""/>
              </div>
              <p className="fs5">法务公告</p>
            </div>
            <div className={styles['banner4-img-box']}>
              <div>
                <img src={banner4Icon3} alt=""/>
              </div>
              <p className="fs5">舆情新闻</p>
            </div>
            <div
              className={
                `styles['banner4-img-box'] ${styles['banner4-img-box-last']}`
              }>
              <div>
                <img src={banner4Icon4} alt=""/>
              </div>
              <p className="fs5">经营信息</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className="clearfix container">
          <p className={`fs5 ${styles['footer-text']}`}>
            {getPermissionMeta(envConfig).beian}
          </p>
        </div>
      </div>
    </div>
  );
}

MainBody.propTypes = {
  clientStore: PropTypes.object,
};
export default inject('clientStore', 'loginStore')(observer(MainBody));
