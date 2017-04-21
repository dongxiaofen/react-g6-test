import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CardTable } from 'components/common/report';
// import styles from './index.less';

function Enterprise({entinvItemList, isLoading}) {
  const data = {
    items: entinvItemList,
    isExpand: false,
    dict: 'entinvItemLists',
    isLoading: isLoading,
    module: '企业对外投资',
    error: entinvItemList.length === 0
  };
  return (
    <div>
      <ModuleTitle module="企业对外投资" count={entinvItemList.length} />
      <CardTable {...data} />
    </div>
  );
}

Enterprise.propTypes = {
  foo: PropTypes.string,
};
export default observer(Enterprise);
