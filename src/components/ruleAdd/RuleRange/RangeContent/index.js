import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Industry from './Industry';
import Area from './Area';
import Scale from './Scale';

function RangeContent({ruleStore}) {
  return (
    <div className={ruleStore.selectRange === 'range' ? styles.box : styles.hidden}>
      <Industry ruleStore={ruleStore} />
      <Area ruleStore={ruleStore} />
      <Scale ruleStore={ruleStore} />
    </div>
  );
}

RangeContent.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(RangeContent);
