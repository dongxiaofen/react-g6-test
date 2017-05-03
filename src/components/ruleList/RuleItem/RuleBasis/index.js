import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleBasis({data}) {
  let dimGroupName = '';
  let description = '';
  let name = '';
  let all = '';
  if (data && data.rule && data.rule.eventType) {
    if (data.rule.eventType.dimGroupName) {
      dimGroupName = data.rule.eventType.dimGroupName;
    }
    if (data.rule.eventType.description) {
      description = data.rule.eventType.description;
    }
    if (data.rule.eventType.name) {
      name = data.rule.eventType.name;
    }
    all = dimGroupName + '-' + description + '-' + name + '，';
  }
  let num = '';
  if (data && data.rule && data.rule.alterNum) {
    num = (<span>
      发生次数大于等于<i>{data.rule.alterNum}</i>
    </span>);
  }
  return (
    <div className={styles.box}>
      预警依据：{all}{num}
    </div>
  );
}

RuleBasis.propTypes = {
  data: PropTypes.object,
};
export default observer(RuleBasis);
