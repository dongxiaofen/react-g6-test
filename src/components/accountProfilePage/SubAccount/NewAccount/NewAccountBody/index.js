import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Popover from 'antd/lib/popover';
import { runInAction } from 'mobx';
import styles from './index.less';

function NewAccountBody({data, routing, accountSettingStore}) {
  const spliceString = (userName, email) => {
    const str = userName.concat(`（${email}）`);
    if (str.length > 18) {
      return `所属账号：${str.slice(0, 18)}...`;
    }
    return `所属账号：${str}`;
  };
  const jumpAccoutSetting = (email, userId) => {
    console.log(email, userId);
    runInAction('account', () => {
      accountSettingStore.tree.fromHome = true;
      accountSettingStore.tree.searchInput = email;
      accountSettingStore.tree.activeId = userId;
      routing.push(`/accountSetting`);
    });
  };
  const iconShow = (index) => {
    if (index === 0) {
      return (<div className={`${styles.icon_new}`}></div>);
    } else if (index !== 0 && index < 3) {
      return (<div className={`${styles.icon_number} ${styles[`nomal_${index + 1}`]}`}></div>);
    }
    return null;
  };
  const createList = () => {
    let arrList = [];
    if (data) {
      data.map( (itemData, index) => {
        arrList = [...arrList,
          <li key={`${index}newAccount`} className={`${styles.list_item}`}>
            <div className={`${styles.marginRL} clearfix`}>
              <div className="clearfix">
                {iconShow(index)}
                <span onClick={jumpAccoutSetting.bind(this, itemData.email, itemData.userId)} className={`${styles.user}`}>
                <Popover content={`所属账号：${itemData.userName}（${itemData.email}）`}>
                  {spliceString(itemData.userName, itemData.email)}
                </Popover>
            </span>
              </div>
              <div className={`${styles.date}`}>
                <span>预警日期：</span>
                <span>{itemData.alertDt}</span>
              </div>
            </div>
          </li>
        ];
      });
      return arrList;
    }
  };
  return (
    <ul className={styles.item_box}>
      {createList()}
    </ul>
  );
}

NewAccountBody.propTypes = {
  data: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    errCategory: 3,
    errorWords: '',
    error: props.error,
    module: props.module,
    path: props.path,
  })
})(inject('routing', 'accountSettingStore')(observer(NewAccountBody)));
