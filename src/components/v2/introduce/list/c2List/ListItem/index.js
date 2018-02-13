import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Button from 'components/lib/button';
import styles from './index.less';

import pic1 from 'imgs/interface/被执行信息.png';
import pic2 from 'imgs/interface/个人身份核验.png';
import pic3 from 'imgs/interface/企业名查询.png';
import pic4 from 'imgs/interface/中国-企业搜索.png';
import pic5 from 'imgs/interface/企业-对外投资.png';
import pic6 from 'imgs/interface/法人-对外投资任职.png';
import pic7 from 'imgs/interface/股东-对外投资任职.png';
import pic8 from 'imgs/interface/董监高-对外投资任职.png';
import pic9 from 'imgs/interface/开庭公告.png';
import pic10 from 'imgs/interface/法院公告.png';
import pic11 from 'imgs/interface/失信被执行信息.png';
import pic12 from 'imgs/interface/裁判文书.png';
import pic13 from 'imgs/interface/经营指标.png';

const ListItem = ({data, routing}) => {
  const getImg = (name) => {
    const picData = {
      '被执行信息': pic1,
      '个人身份核验': pic2,
      '企业名查询': pic3,
      '中国-企业搜索': pic4,
      '企业-对外投资': pic5,
      '法人-对外投资任职': pic6,
      '股东-对外投资任职': pic7,
      '董监高-对外投资任职': pic8,
      '开庭公告': pic9,
      '法院公告': pic10,
      '失信被执行信息': pic11,
      '裁判文书': pic12,
      '经营指标': pic13,
    };
    return picData[name];
  };
  const gotoDocPage = () => {
    // console.log('gotoDocPage');
    routing.push({
      pathname: '/v2/detail',
      query: {id: data.id, name: data.name, c1Name: data.classification}
    });
  };
  return (
    <div className={styles['list-item']}>
      <div className={data.applied > 0 ? styles.applied : styles.unapplied}>
        <div className={styles.imgIcon}></div>
        <span>{`${data.applied > 0 ? '已' : '未'}申请`}</span>
      </div>
      <div className={styles.picture}>
        <img src={getImg(data.name)} alt=""/>
      </div>
      <div className={styles['left-cont']}>
        <h3 className={styles.name} onClick={gotoDocPage}>{data.name}</h3>
        <div className={styles.discript} title={data.description}>{data.description}</div>
        <div className={styles.classify}>分类: {data.classification}</div>
      </div>
      <div className={styles['right-btn']}>
        <Button btnType="primary" className={styles.vsbtn} onClick={gotoDocPage}>查看文档</Button>
      </div>
    </div>
  );
};
ListItem.propTypes = {
  data: PropTypes.object,
  // uiStore: PropTypes.object,
};
export default inject('routing')(observer(ListItem));
