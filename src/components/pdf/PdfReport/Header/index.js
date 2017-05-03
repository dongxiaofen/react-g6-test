import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import pathval from 'pathval';

function Header({clientStore, pdfStore}) {
  const envConfig = clientStore.envConfig;
  const moduleData = pdfStore.banner;
  // 地址
  const addressData = pathval.getPathValue(moduleData, 'bannerInfo.bannerInfo.address');
  let addressList = '';
  let addressDom = '';
  if (addressData !== null && addressData.length > 0) {
    addressData.forEach((item) => {
      addressList = addressList + item.address + '　　';
    });
    addressDom = (
      <div className={styles.bannerSingle}>
        <span className={styles.bannerKey}>公司地址：</span>
        <span className={styles.bannerValue}>{addressList}</span>
      </div>
    );
  }
  // 邮件地址
  const emailData = pathval.getPathValue(moduleData, 'bannerInfo.bannerInfo.email');
  let emailList = '';
  let emailDom = '';
  if (emailData !== null && emailData.length > 0) {
    emailData.forEach((item) => {
      emailList = emailList + item + '　　';
    });
    emailDom = (
      <div className={styles.bannerSingle}>
        <span className={styles.bannerKey}>邮箱地址：</span>
        <span className={styles.bannerValue}>{emailList}</span>
      </div>
    );
  }
  // 网址
  const indexData = pathval.getPathValue(moduleData, 'bannerInfo.bannerInfo.index');
  let indexList = '';
  let indexDom = '';
  if (indexData !== null && indexData.length > 0) {
    indexData.forEach((item) => {
      indexList = indexList + item.url + '　　';
    });
    indexDom = (
      <div className={styles.bannerSingle}>
        <span className={styles.bannerKey}>公司网址：</span>
        <span className={styles.bannerValue}>{indexList}</span>
      </div>
    );
  }
  // 公司电话
  const phoneData = pathval.getPathValue(moduleData, 'bannerInfo.bannerInfo.phone');
  let phoneList = '';
  let phoneDom = '';
  if (phoneData !== null && phoneData.size > 0) {
    phoneData.forEach((item) => {
      phoneList = phoneList + item + '　　';
    });
    phoneDom = (
      <div className={styles.bannerSingle}>
        <span className={styles.bannerKey}>公司电话：</span>
        <span className={styles.bannerValue}>{phoneList}</span>
      </div>
    );
  }
  // 行业
  const industryData = pathval.getPathValue(moduleData, 'bannerInfo.featureIndustry.result.industryType');
  let industryList = '';
  let industryDom = '';
  if (industryData !== null && industryData.length > 0) {
    industryData.forEach((item) => {
      industryList = industryList + item + '　　';
    });
    industryDom = (
      <div className={styles.bannerSingle}>
        <span className={styles.bannerKey}>所属行业：</span>
        <span className={styles.bannerValue}>{industryList}</span>
      </div>
    );
  }
  return (
    <div className={styles.wrap}>
      {
        envConfig === 'dianxin_prod'
          ?
          <div className={styles.copyright}>
            法律声明：本报告是根据你输入的查询文字所返回的查询结果，仅供你参考。在任何情况下本报告不构成对被查询企业、个人之明示或暗示的观点或担保。
            你应自行判断是否投资，并承担由此而导致的一切损失或责任。重庆电信系统集成有限公司和杭州誉存科技有限公司对本报告享有著作权，未经书面允许，
            任何人不得以任何方式在世界任何地区以任何文字翻印、拷贝、仿制或转载本报告部分或全部内容。如有违反，必将诉之于法律责任，感谢合作！
          </div>
          :
          ''
      }
      <div className={styles.companyName}>{moduleData.name}</div>
      <div className={styles.bannerWrap}>
        {phoneDom}
        {indexDom}
        {emailDom}
        {addressDom}
        {industryDom}
      </div>
    </div>
  );
}

Header.propTypes = {
  pdfStore: PropTypes.object,
  clientStore: PropTypes.object,
};
export default inject('clientStore', 'pdfStore')(observer(Header));
