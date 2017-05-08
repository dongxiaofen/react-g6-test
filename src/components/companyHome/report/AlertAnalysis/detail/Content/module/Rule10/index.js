import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
import styles from './index.less';
function Rule10({data}) {
  const modifyPolicy = (value)=> {
    const output = [];
    const policy = value.sort((value1, value2)=>{
      return value2.publishdate > value1.publishdate ? 1 : -1;
    });
    policy.map((itemData, idx)=> {
      output.push(
        <div className="clearfix" key={`policy${idx}`}>
          <p className={styles.policy}>
            <a href={itemData.url} target="_blank">《{itemData.title}》</a>
          </p>
          <p className={styles.date}>
            <span>发布日期：</span>
            <span>{itemData.publishdate}</span>
          </p>
        </div>
      );
    });
    return output;
  };
  const meta = {
    dict: 'rule10',
    body: [
      {'key': 'involedIndustryPolicy', 'width': '12', blockShow: true, modifyBlock: modifyPolicy},
    ],
    item: data.detail[0],
  };
  return (
    <SimpleCard meta={meta} />
  );
}

Rule10.propTypes = {
  foo: PropTypes.string,
};
export default observer(Rule10);
