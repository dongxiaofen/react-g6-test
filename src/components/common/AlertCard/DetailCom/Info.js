import React from 'react';
import {observer} from 'mobx-react';
import {News, JudgeDoc, Bidding} from '../Module';
function Info({store, data, module, cardType}) {
  const componentMap = (pattern) => {
    switch (pattern) {
      case 'NEWS':
        return <News data={data} store={store} module={module} cardType={cardType}/>;
      case 'JUDGMENT':
        return <JudgeDoc data={data} store={store} module={module} cardType={cardType}/>;
      case 'BIDDING':
        return <Bidding data={data} store={store} module={module} cardType={cardType}/>;
      default:
        return <div></div>;
    }
  };
  const pattern = data.pattern;
  return <div>{componentMap(pattern)}</div>;
}
export default observer(Info);
