import React from 'react';
import { observer } from 'mobx-react';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import Item from '../Item';
import PwdModal from '../../userModal/PwdModal';
import EditModal from '../../userModal/EditModal';
import styles from './index.less';
import Popover from 'antd/lib/popover';
function BaseInfo({accountSettingStore}) {
  // const consumeType = clientStore.userInfo.consumeType;
  const baseInfo = accountSettingStore.base;
  const tree = accountSettingStore.tree;
  const activeIndex = tree.activeIndex;
  const showPwdModal = () => {
    accountSettingStore.changeValue('pwdModal.visible', true);
  };
  const handleEmail = (values) => {
    if (baseInfo.error) {
      return values;
    }
    const level = tree.data.content[activeIndex].level;
    if (values.length > 18) {
      return (
        <div className={styles.pwdBox}>
          <Popover content={values}>
            {`${values.slice(0, 17)}...`}
          </Popover>
          {level < 2 && <span className={styles.changePwd} onClick={showPwdModal}>修改密码</span>}
        </div>
      );
    }
    return (
      <div className={styles.pwdBox}>
        <span className={styles.value}>{values}</span>
        {level < 2 && <span className={styles.changePwd} onClick={showPwdModal}>修改密码</span>}
      </div>
    );
  };
  // const addUnit = (unit, value) => {
  //   if (value === '- -') return value;
  //   return value + ' ' + unit;
  // };
  const editUserInfo = (name, values) => {
    accountSettingStore.changeValue('editModal.actName', name);
    accountSettingStore.changeValue(`editModal.form.${name}.value`, values);
    accountSettingStore.changeValue('editModal.visible', true);
  };
  const handleEdit = (values, name) => {
    if (baseInfo.error) {
      return values;
    }
    const level = tree.data.content[activeIndex].level;
    if (values.length > 14) {
      return (
        <div className={level < 2 ? styles.editBox : styles.editDisable}>
          <Popover content={values}>
            {`${values.slice(0, 13)}...`}
          </Popover>
          {level < 2 && <span className={styles.editBtn} onClick={editUserInfo.bind(null, name, values)}>修改</span>}
        </div>
      );
    }
    return (
      <div className={level < 2 ? styles.editBox : styles.editDisable}>
        <span className={styles.value}>{values}</span>
        {level < 2 && <span className={styles.editBtn} onClick={editUserInfo.bind(null, name, values)}>修改</span>}
      </div>
    );
  };
  let output = (
    <div
      className={styles.animateBox}>
      <AnimateLoading />
    </div>
  );
  if (baseInfo.data) {
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
      // 设计图没有此字段暂时隐藏
      // {
      //   name: '套餐有效期',
      //   keys: 'lastLoginTs',
      //   none: consumeType !== 'FEESET' || baseInfo.data.parentUserId ? true : false,
      // },
      // {
      //   name: '剩余点数',
      //   keys: 'point',
      //   none: consumeType !== 'POINT' || baseInfo.data.parentUserId ? true : false,
      //   handle: addUnit.bind(null, '点'),
      // },
    ];
    output = config.map((item, idx) => {
      if (!item.none) {
        return (
          <Item
            key={idx}
            {...item}
            values={baseInfo.data[item.keys]} />
        );
      }
    });
  }
  return (
    <div className={styles.infoBox}>
      <h2 className={styles.baseTitle}>基本信息</h2>
      {output}
      <PwdModal />
      <EditModal />
    </div>
  );
}

export default observer(BaseInfo);
