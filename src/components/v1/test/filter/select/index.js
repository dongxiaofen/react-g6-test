import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import { Select } from 'antd';
const Option = Select.Option;
// import styles from './index.less';

function selectItem({value, data, handleFunc}) {
  const createOption = () => {
    if (data && data.length > 0) {
      return data.map(({name, id}) => {
        return (<Option key={id} value={id}>{name}</Option>);
      });
    }
  };
  return (
    <div style={{display: 'inline-block', marginRight: '20px'}}>
      <Select value={value} style={{ width: 260 }} onChange={handleFunc}>
        {createOption()}
      </Select>
    </div>
  );
}

selectItem.propTypes = {
  // target: PropTypes.object,
  data: PropTypes.array,
  handleFunc: PropTypes.func,
  value: PropTypes.string,
};
export default observer(selectItem);
