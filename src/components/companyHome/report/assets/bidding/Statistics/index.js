import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report/';

function Statistics({}) {
  return (
    <div>
      <ModuleTitle module="招投标统计表" />
      阿士大夫士大夫士大夫撒旦法
    </div>
  );
}

Statistics.propTypes = {
  foo: PropTypes.string,
};
export default observer(Statistics);
