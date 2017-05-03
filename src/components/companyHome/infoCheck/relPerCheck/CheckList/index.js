import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import CheckItem from './CheckItem';
import Pager from 'components/common/Pager';

function CheckList({listData}) {
  return (
    <div>
      {listData.map( (itemData, index) => <CheckItem itemData={itemData} key={`checkListKey${index}`} />)}
      <Pager tData={listData} module="relPerCheck" type="small" />
    </div>
  );
}

CheckList.propTypes = {
  listData: PropTypes.object,
};
export default observer(CheckList);
