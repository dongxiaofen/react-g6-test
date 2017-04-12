import React from 'react';
import { observer } from 'mobx-react';
import Input from 'components/lib/input';
import styles from './index.less';
function SearchBar({monitorListStore}) {
  const companyName = monitorListStore.searchParams.companyName;
  const handleSearch = (evt) => {
    monitorListStore.changeParams({
      companyName: evt.target.value,
    });
  };
  return (
    <Input
      inputType="singleline"
      className={styles.inputCss}
      onChange={handleSearch}
      value={companyName}
      placeholder="输入主体/关联企业名"
      />
  );
}
export default observer(SearchBar);
