import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';
import SingeInfo from './SingeInfo/index';

function Statistics({titleData, data}) {
  const createList = () => {
    let listArr = [];
    for (const key in data) {
      if (key) {
        listArr = [...listArr, <SingeInfo key={key} title={titleData[key]} count={data[key]} />];
      }
    }
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
