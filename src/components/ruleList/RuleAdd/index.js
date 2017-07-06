import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import Input from 'components/lib/input';
import styles from './index.less';

function RuleAdd({ruleStore}) {
  const pushRuleAdd = () => {
    browserHistory.push('/ruleAdd');
  };
  const searchInput = ruleStore.searchInput;
  const inputChange = (evt) => {
    ruleStore.setSearchInput(evt.target.value);
  };
  const handleSearch = (evt) => {
    if (evt.keyCode === 13) {
      ruleStore.getSearchRuleList(evt.target.value);
    }
  };
  return (
    <div className={`${styles.box}`}>
      <div className={`${styles.boxCon}`}>
        <div className={`${styles.ruleAdd}`} onClick={pushRuleAdd}>
          <i>+</i>
          <span>
            新增预警设置
          </span>
        </div>
        <Input
          inputType="singleline"
          className={styles.inputCss}
          onChange={inputChange}
          onKeyUp={handleSearch}
          value={searchInput}
          placeholder="输入预警规则名"
          />
      </div>
    </div>
  );
}

RuleAdd.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(RuleAdd);
