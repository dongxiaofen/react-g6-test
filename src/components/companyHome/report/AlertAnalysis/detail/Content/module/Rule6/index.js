import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import SimpleCard from 'components/common/report/alertAnalysis/SimpleCard';
function Rule6({data}) {
  const modifyPolicy = (value)=> {
    const output = [];
    value.map((itemData)=> {
      output.push(
        <p className={styles.policy}>
          <a href={itemData.url} target="_blank">《{itemData.title}》</a>
        </p>
      );
    });
  };
  const meta = {
    dict: 'rule6',
    body: [
      {'key': 'policy', 'width': '12', blockShow: true, modifyBlock: modifyPolicy},
    ],
    item: data.detail[0],
  };
  return (
    <SimpleCard meta={meta} />
  );
}

Rule6.propTypes = {
  foo: PropTypes.string,
};
export default observer(Rule6);
