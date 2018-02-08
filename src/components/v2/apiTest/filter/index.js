import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { toJS } from 'mobx';
import InfoItem from '../testInfo/item';
import SelectItem from './select';
// import styles from './index.less';

function FilterCont({apiTestStore}) {
  const handleC1 = (value) => {
    apiTestStore.updateValue('activeC1Id', value);
    apiTestStore.updateValue('c1Name', '');
    apiTestStore.updateValue('c2Id', '');
    apiTestStore.updateValue('classificationId', '');
    apiTestStore.updateValue('testResult', {});
    apiTestStore.getAssortmentC2();
    apiTestStore.updateValue('activeC2Id', '');
    apiTestStore.updateValue('activeApiId', '');
  };
  const handleC2 = (value) => {
    apiTestStore.updateValue('activeC2Id', value);
    apiTestStore.updateValue('activeApiId', '');
    apiTestStore.getApiList();
    apiTestStore.updateValue('testResult', {});
  };
  const handleApiList = (value) => {
    apiTestStore.updateValue('activeApiId', value);
    apiTestStore.getApiInfo();
    apiTestStore.updateValue('testResult', {});
  };
  return (
    <InfoItem title="接口选择：">
      <div style={{display: 'inline-block'}}>
        <SelectItem
          value={apiTestStore.activeC1Id}
          data={toJS(apiTestStore.assortmentC1)}
          handleFunc={handleC1}
          placeholder="一级类别"/>
        <SelectItem
          value={apiTestStore.activeC2Id}
          data={toJS(apiTestStore.assortmentC2)}
          handleFunc={handleC2}
          placeholder="二级类别"/>
        <SelectItem
          value={apiTestStore.activeApiId}
          data={toJS(apiTestStore.apiList)}
          handleFunc={handleApiList}
          placeholder="接口名称"/>
      </div>
    </InfoItem>
  );
}

FilterCont.propTypes = {
  apiTestStore: PropTypes.object,
};
export default inject('apiTestStore')(observer(FilterCont));
