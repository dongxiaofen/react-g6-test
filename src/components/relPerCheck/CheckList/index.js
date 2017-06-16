import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import CheckItem from './CheckItem';
import Pager from 'components/common/Pager';
import styles from './index.less';
import NoneData from './NoneData';

function CheckList({listData}) {
  if (listData.length === 0) {
    return <NoneData />;
  }
  return (
    <div className={styles.list_box}>
      {listData.map( (itemData, index) => <CheckItem itemData={itemData} key={`checkListKey${index}`} />)}
      <Pager tData={listData} module="relPerCheck" type="large" />
    </div>
  );
}

CheckList.propTypes = {
  listData: PropTypes.object,
};
export default observer(CheckList);
