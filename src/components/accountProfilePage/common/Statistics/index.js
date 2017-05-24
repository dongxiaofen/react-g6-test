import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';
import SingeInfo from './SingeInfo/index';

function Statistics({titleData, data, units}) {
  const createList = () => {
    let listArr = [];
    Object.keys(titleData).map( (key) => {
      listArr = [...listArr, <SingeInfo key={key} title={titleData[key]} unit={units[key]} count={data[key]} />];
    });
    return listArr;
  };

  return (
    <div className="clearfix">
      {createList()}
    </div>
  );
}

Statistics.propTypes = {
  foo: PropTypes.string,
};
export default observer(Statistics);
