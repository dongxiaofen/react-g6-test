import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Select from 'components/lib/Select';

const Option = Select.Option;
function SwitchData({}) {
  return (
    <div>
      <Select>
        <Option value="">
          所有企业
        </Option>
        <Option value="MAIN">
          主体企业
        </Option>
        <Option value="ASSOCIATE">
          关联企业
        </Option>
      </Select>
    </div>
  );
}

SwitchData.propTypes = {
  foo: PropTypes.string,
};
export default observer(SwitchData);
