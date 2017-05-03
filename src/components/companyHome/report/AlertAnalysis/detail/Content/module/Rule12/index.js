import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import DetailTable from 'components/common/report/alertAnalysis/DetailTable';
import styles from './index.less';

function Rule12({data}) {
  const modifyRealation = (value)=> {
    return value.join('／');
  };
  const meta = {
    dict: 'rule12',
    body: [
      [{ 'key': 'detail', kids: [
        {key: 'companyName', colSpan: '1'},
        {key: 'relation', colSpan: '1', 'modifyBlock': modifyRealation},
      ]
      }],
    ],
    maxCols: 2,
    items: data,
    hasNumber: false,
  };
  return (
    <div>
      <p className={styles.title}>工商经营状态为已注销/吊销的关联企业如下：</p>
      <DetailTable itemData={data} {...meta}/>
    </div>
  );
}

Rule12.propTypes = {
  foo: PropTypes.string,
};
export default observer(Rule12);
