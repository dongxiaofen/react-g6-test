import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import DetailCard from '../../DetailCard';
import styles from './index.less';
function Rule32To50({data}) {
  const modifyPolicy = (policy) => {
    const output = [];
    policy.forEach((item, idx)=>{
      output.push(
        <p key={`policy${idx}`}>
          <a target="_blank" href={item.url}>{`《${item.title}》`}</a>
        </p>
      );
    });
    return <div className={styles.policy}>{output}</div>;
  };
  const meta = {
    dict: 'rule32to50',
    body: [
      [{ 'key': 'companyName', colSpan: '1'}, { 'key': 'relation', colSpan: '1'}],
      [{ 'key': 'policy', colSpan: '2', modifyBlock: modifyPolicy}],
    ],
    items: data.detail,
    maxCols: 3,
    hasNumber: true,
  };
  return (
    <DetailCard meta={meta}/>
  );
}

Rule32To50.propTypes = {
  foo: PropTypes.string,
};
export default observer(Rule32To50);
