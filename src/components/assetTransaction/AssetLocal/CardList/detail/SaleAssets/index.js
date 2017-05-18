import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function SaleAssets({ data, swiperImg, setAssetLocalSwiperImg }) {
  const updateImgState = (activeImg, bgImgDistance) => {
    setAssetLocalSwiperImg('activeImg', activeImg);
    setAssetLocalSwiperImg('bgImgDistance', bgImgDistance);
  };

  const translateNavImg = (IMG_WIDTH, index) => {
    if (data.pictures.length - 5 > 0) {
      const indexDis = index < data.pictures.length - 5 ? index : data.pictures.length - 5;
      const distance = -(indexDis * IMG_WIDTH);
      setAssetLocalSwiperImg('distance', distance);
    }
  };

  const swiperImgOnClick = (type) => {
    const BG_IMG_WIDTH = 568;
    let bgImgDistance = 0;
    let activeImg = 0;
    const imgSateBgimg = swiperImg.bgImgDistance;
    if (type === 'next') {
      if (imgSateBgimg > -(data.pictures.length - 1) * BG_IMG_WIDTH) {
        bgImgDistance = imgSateBgimg - BG_IMG_WIDTH;
        activeImg = -(bgImgDistance / BG_IMG_WIDTH);
        updateImgState(activeImg, bgImgDistance);
        translateNavImg(121, activeImg);
      }
    } else {
      if (imgSateBgimg < 0) {
        bgImgDistance = imgSateBgimg + BG_IMG_WIDTH;
        activeImg = -((imgSateBgimg + BG_IMG_WIDTH) / BG_IMG_WIDTH);
        updateImgState(activeImg, bgImgDistance);
        translateNavImg(121, activeImg);
      }
    }
  };

  const createImg = () => {
    const output = [];
    data.pictures.forEach((pic, idx) => {
      output.push(
        <div key={`assetLocalDetailImgKey${idx}`} className={styles.bgImgWrap}>
          <img className={styles.bgImg} src={pic} />
        </div>
      );
    });
    return output;
  };

  const translateImg = (type, IMG_WIDTH) => {
    let distance = 0;
    const imgSateDistance = swiperImg.distance;
    if (type === 'next') {
      if (imgSateDistance > -(data.pictures.length - 5) * IMG_WIDTH) {
        distance = imgSateDistance - IMG_WIDTH;
        setAssetLocalSwiperImg('distance', distance);
      }
    } else {
      if (imgSateDistance < 0) {
        distance = imgSateDistance + IMG_WIDTH;
        setAssetLocalSwiperImg('distance', distance);
      }
    }
  };

  const changeImg = (index) => {
    const BG_IMG_WIDTH = 568;
    updateImgState(index, -(index * BG_IMG_WIDTH));
  };

  const createImgNav = (_data) => {
    const output = [];
    const sizeCss = _data.pictures.length > 5 ? styles.lgFive : styles.lteFive;
    _data.pictures.forEach((imgSrc, index) => {
      const cssName = swiperImg.activeImg === index ? styles.navWrapActive : styles.navWrap;
      output.push(
        <div key={`assetLocalDetailImgNavKey${index}`} className={`${sizeCss} ${cssName}`}>
          <img src={imgSrc} onClick={changeImg.bind(this, index)} />
        </div>
      );
    });
    return output;
  };

  const createInfo = (_data, dataConfig) => {
    const output = [];
    dataConfig.forEach((item, key) => {
      output.push(
        <div key={`assetLocalDetailInfoKey${key}`} className={`${styles.row} clearfix`}>
          <span className={styles.label}>{item.label}：</span>
          <span className={styles.value}>{_data[item.key] || '无'}</span>
        </div>
      );
    });
    return output;
  };

  const dataConfig = [
    { key: 'location', label: '所在区域' },
    { key: 'builtupArea', label: '建筑面积' },
    { key: 'usage', label: '用途' },
    { key: 'structure', label: '房屋结构' },
    { key: 'decoration', label: '装修情况' },
    { key: 'age', label: '房龄' },
    { key: 'contact', label: '联系人' },
    { key: 'phoneNumber', label: '联系电话' },
  ];
  const lgFiveImgs = data.pictures.length > 5;
  const IMG_WIDTH = 121;
  const BG_IMG_WIDTH = 568;
  const navInnerWidth = lgFiveImgs ? data.pictures.length * IMG_WIDTH + 'px' : data.pictures.length * 130 + 'px';
  const innerWidth = data.pictures.length * BG_IMG_WIDTH + 'px';
  const hasNoPic = data.pictures.length === 0;
  return (
    <div>
      <div className={`clearfix ${styles.top}`}>
        {
          hasNoPic ? ''
            :
            <div className={styles.imgSwiper}>
              <div className={styles.imgWrap}>
                <i className={`fa fa-angle-left ${styles.prev}`} onClick={swiperImgOnClick.bind(this, 'prev')}></i>
                <i className={`fa fa-angle-right ${styles.next}`} onClick={swiperImgOnClick.bind(this, 'next')}></i>
                <div className={styles.imgContent}>
                  <div className={styles.imgInner} style={{ width: innerWidth, transform: `translateX(${swiperImg.bgImgDistance}px)` }}>
                    {createImg()}
                  </div>
                </div>
              </div>
              <div className={`${styles.navContainer} clearfix`}>
                {
                  lgFiveImgs ?
                    <span className={styles.navPrev} onClick={translateImg.bind(this, 'prev', IMG_WIDTH)}>
                      <i className={`fa fa-angle-left`} aria-hidden="true"></i>
                    </span>
                    : null
                }
                <div className={lgFiveImgs ? styles.navContent : styles.navContentL}>
                  <div style={{ width: navInnerWidth, transform: `translateX(${swiperImg.distance}px)` }} className={styles.navInner}>
                    {createImgNav(data)}
                  </div>
                </div>
                {
                  lgFiveImgs ?
                    <span className={styles.navNext} onClick={translateImg.bind(this, 'next', IMG_WIDTH)}>
                      <i className={`fa fa-angle-right`} aria-hidden="true"></i>
                    </span>
                    : null
                }
              </div>
            </div>
        }
        <div className={hasNoPic ? styles.textHasNoPic : styles.textHasPic}>
          {createInfo(data, dataConfig)}
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
    </div>
  );
}

SaleAssets.propTypes = {
  data: PropTypes.object,
  swiperImg: PropTypes.object,
  setAssetLocalSwiperImg: PropTypes.func,
};
export default observer(SaleAssets);
