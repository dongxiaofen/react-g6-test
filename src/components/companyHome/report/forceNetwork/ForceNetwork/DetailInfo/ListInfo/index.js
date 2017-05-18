import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
// import * as svgTools from 'helpers/svgTools';
// import styles from './index.less';

function ListInfo({listData}) {
  const createTabs = ()=> {
    const output = [];
    listData.tabs.map((tabItem, idx)=>{
      if (listData.content[idx].data) {
        output.push(
          <p key={`tab${idx}`}>{tabItem}</p>
        );
      }
    });
    return output;
  };
  return (
    <div>
      <div>
        {createTabs()}
      </div>
      <div>
      </div>
    </div>
  );
}

ListInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('routing')(observer(ListInfo));
