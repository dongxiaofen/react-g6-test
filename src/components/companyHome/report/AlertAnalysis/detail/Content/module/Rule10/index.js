import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
import styles from './index.less';
function Rule10({data}) {
  const modifyPolicy = (value)=> {
    const output = [];
    value.map((itemData, idx)=> {
      output.push(
        <p key={`policy${idx}`} className={styles.policy}>
          <a href={itemData.url} target="_blank">《{itemData.title}》</a>
        </p>
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
