import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
import styles from './index.less';
function Rule13To31({data}) {
  const modifyPolicy = (value)=> {
    const output = [];
    const policy = value.sort((value1, value2)=>{
      return value2.publishDate > value1.publishDate ? 1 : -1;
    });
    policy.map((itemData, idx)=> {
      output.push(
        <div className="clearfix" key={`policy${idx}`}>
          <p className={styles.policy} key={`policy${idx}`}>
            <a href={itemData.url} target="_blank">《{itemData.title}》</a>
          </p>
          <p className={styles.date}>
            <span>发布日期：</span>
            <span>{itemData.publishDate}</span>
          </p>
        </div>
      );
    });
    return output;
  };
  const meta = {
    dict: 'rule12to31',
    body: [
      {'key': 'policy', 'width': '12', blockShow: true, modifyBlock: modifyPolicy},
    ],
    item: data.detail[0],
  };
  return (
    <SimpleCard meta={meta} />
  );
}

Rule13To31.propTypes = {
  foo: PropTypes.string,
};
export default observer(Rule13To31);
