import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { toJS } from 'mobx';
import InfoItem from '../testInfo/item';
import SelectItem from './select';
// import styles from './index.less';

function FilterCont({interfaceTestStore}) {
  const handleTypeChange = (value) => {
    interfaceTestStore.updateValue('chosedType', value);
    interfaceTestStore.getfiltedApiList();
  };
  const handleListChange = (value) => {
    console.log(value, 'id');
    interfaceTestStore.changeChosedInfo(value);
  };

  return (
    <InfoItem title="接口选择：">
      <div style={{display: 'inline-block'}}>
        <SelectItem
          value={interfaceTestStore.chosedType}
          data={interfaceTestStore.interfaceTypeList}
          handleFunc={handleTypeChange}
          placeholder="请选择接口类型"/>
        {
          interfaceTestStore.id ?
          <SelectItem
            value={interfaceTestStore.id}
            data={toJS(interfaceTestStore.filtedApiList)}
            handleFunc={handleListChange}
            placeholder="请选择接口名称"/> : null
        }
      </div>
    </InfoItem>
  );
}

FilterCont.propTypes = {
  interfaceTestStore: PropTypes.object,
};
export default inject('interfaceTestStore')(observer(FilterCont));
