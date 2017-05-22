import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Popover from 'antd/lib/popover';
import { runInAction } from 'mobx';
import styles from './index.less';

function NewAccountBody({data, routing, accountSettingStore}) {
  const spliceString = (str) => {
    if (str.length > 18) {
      return `所属账号：${str.slice(0, 18)}...`;
    }
    return `所属账号：${str}`;
  };
  const jumpAccoutSetting = (email, userId) => {
    runInAction('account', () => {
      accountSettingStore.fromHome = false;
      accountSettingStore.searchInput = email;
      accountSettingStore.activeId = userId;
    });
    routing.push(`/searchCompany`);
  };
  const createList = () => {
    let arrList = [];
    if (data) {
      data.map( (itemData, index) => {
        arrList = [...arrList,
          <li key={`${index}newAccount`} className={`${styles.list_item}`}>
            <div className={`${styles.marginRL} clearfix`}>
              <div onClick={jumpAccoutSetting(itemData, itemData.email)} className={`${styles.user} pull-left`}>
                <Popover content={`所属账号：${itemData.userName}（${itemData.email}`}>
                  {spliceString(itemData.userName.concat(itemData.email))}
                </Popover>
              </div>
              <div className={`${styles.date} pull-right`}>
                <p>最新预警日期</p>
                <p>{itemData.alertDt}</p>
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
    error: props.error,
    module: props.module
  })
})(inject('routing', 'accountSettingStore')(observer(NewAccountBody)));
