import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import BaseInfo from '../common/BaseInfo';
import ListInfo from '../common/ListInfo';
import Operation from '../common/Operation';
// import * as svgTools from 'helpers/svgTools';
import styles from './index.less';

function PersonInfo({forceNetworkStore}) {
  const personInfo = forceNetworkStore.nodeInfo.detailInfo;
  const baseConfig = [
    {key: 'positionOther', label: '对外任职'},
    {key: 'invest', label: '对外投资'},
    {key: 'investMount', label: '投资金额'},
  ];
  const listConfig = {
    tabs: ['任职信息', '投资信息'],
    content: [
      {
        keys: [{key: 'position', label: '职位'}],
        data: personInfo.basicInfo.positionList,
        type: 'block'
      },
      {
        keys: [{key: 'invRatio', label: '投资比例', keyType: 'ratio'}, {key: 'invConum', label: '投资金额', keyType: 'money'}],
        data: personInfo.basicInfo.investList,
        type: 'block'
      }
    ]
  };
  return (
    <div>
      <p className={styles.name}>{personInfo.basicInfo.name}</p>
      <BaseInfo config={baseConfig} data={personInfo.basicInfo}/>
      <Operation forceNetworkStore={forceNetworkStore}/>
      <ListInfo listData = {listConfig} forceNetworkStore={forceNetworkStore}/>
    </div>
  );
}

PersonInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(PersonInfo);
