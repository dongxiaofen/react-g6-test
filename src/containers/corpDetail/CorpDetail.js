import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CorpDetail from 'components/corpDetail/CorpDetail';
@observer
export default class Corp extends Component {
  render() {
    return (
      <div>
        <CorpDetail />
      </div>
    );
  }
}
