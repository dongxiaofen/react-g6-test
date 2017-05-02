import React from 'react';
import { observer } from 'mobx-react';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import Item from '../Item';
import styles from './index.less';
function BaseInfo({accountSettingStore}) {
  const baseInfo = accountSettingStore.base;
  const activeIndex = accountSettingStore.tree.activeIndex;
  const handleEmail = (values) => {
    const level = accountSettingStore.tree.data.content[activeIndex].level;
    return (
      <div className={styles.pwdBox}>
        {values}
        {level < 2 && <span className={styles.changePwd}>修改密码</span>}
      </div>
    );
  };
  const handleEdit = (values) => {
    return (
      <div className={styles.editBox}>
        {values}
        <span className={styles.editBtn}>修改</span>
      </div>
    );
  };
  const config = [
    {
      name: '账号',
      keys: 'email',
      handle: handleEmail,
    },
    {
      name: '姓名',
      keys: 'contact',
      handle: handleEdit,
    },
    {
      name: '职务',
      keys: 'contactPosition',
      handle: handleEdit,
    },
    {
      name: '部门',
      keys: 'department',
      handle: handleEdit,
    },
    {
      name: '电话',
      keys: 'phone',
      handle: handleEdit,
    },
    {
      name: '邮箱',
      keys: 'contactEmail',
      handle: handleEdit,
    },
  ];
  let output = (
    <div
      className={styles.animateBox}>
      <AnimateLoading />
    </div>
  );
  if (baseInfo.data) {
    const content = config.map((item, idx) => {
      return (
        <Item
          key={idx}
          {...item}
          values={baseInfo.data[item.keys]} />
      );
    });
    output = content;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.infoBox}>
        <h2 className={styles.baseTitle}>基本信息</h2>
        {output}
      </div>
    </div>
  );
}

export default observer(BaseInfo);
