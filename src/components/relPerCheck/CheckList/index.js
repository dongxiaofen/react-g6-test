import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import CheckItem from './CheckItem';
import Pager from 'components/common/Pager';
import styles from './index.less';
import { loadingComp } from 'components/hoc';

function CheckList({listData}) {
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
export default loadingComp(
  {mapDataToProps: props=> ({
    loading: props.loading,
    imgCategory: 14,
    category: 2,
    errCategory: 2,
    module: '个人黑名单核查',
    error: props.listData.length === 0,
  })}
)(observer(CheckList));
