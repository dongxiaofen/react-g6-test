import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'components/lib/popover';

function Contact({
  contactVis,
  bannerData,
  closeContactPopoverAlias,
  openContactPopoverAlias,
  contactExtended,
  extendContactAlias
}) {
  const config = [
    { key: 'email', value: '邮箱地址' },
    { key: 'phone', value: '公司电话' },
    { key: 'index', value: '公司网址', subKey: 'url' },
    { key: 'address', value: '公司地址', subKey: 'address'}
  ];
  const removeRepeat = (ary, key) => {
    const output = [];
    ary.map((item) => {
      output.push(item[key]);
    });
    return Array.from(new Set(output));
  };
  const createInfo = () => {
    const output = [];
    config.forEach((configItem, index) => {
      const children = [];
      const infoData = configItem.key === 'address' || configItem.key === 'index' ? removeRepeat(bannerData[configItem.key], configItem.subKey) : bannerData[configItem.key];
      if (infoData.length > 0) {
        let idx = 0;
        for (const itemData of infoData) {
          const item = itemData;
          children.push(<p key={`${configItem.key}${idx}`} className={styles.infoText} >{item}</p>);
          if (contactExtended !== configItem.key) {
            break;
          }
          idx++;
        }
        const arrowCss = contactExtended === configItem.key ? styles.arrowUp : styles.arrow;
        output.push(
          <div key={index} className={styles.rowWrap}>
            <p className={styles.infoTitle}>{configItem.value}</p>
            <div className={styles.row}>
              {infoData.length > 1 ?
                <i
                  className={`fa fa-angle-down ${arrowCss}`}
                  aria-hidden="true"
                  onClick={extendContactAlias.bind(this, configItem.key)}></i>
                : ''
              }
              {children}
            </div>
          </div>
        );
      }
    });
    return (
      <div className={styles.infoWrap}>
        <i className={styles.close} onClick={closeContactPopoverAlias}></i>
        {output}
      </div>
    );
  };

  let flag = false;
  for (const configItem of config) {
    if (bannerData[configItem.key] && bannerData[configItem.key].length > 0) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    return null;
  }
  const iconCss = contactVis ? styles.contactIconUp : styles.contactIcon;
  return (
    <div className={styles.contactInfo}>
      <Popover
        visible={contactVis}
        left="40px"
        top="25px"
        content={createInfo()}
        closePopover={closeContactPopoverAlias}
        openPopover={openContactPopoverAlias}
        id="contactInfo">
        <span className={`${styles.messageStyle}`}>
          基本联系信息
          <i className={iconCss}></i>
        </span>
      </Popover>
    </div>
  );
}

Contact.propTypes = {
  foo: PropTypes.string,
};
export default observer(Contact);
