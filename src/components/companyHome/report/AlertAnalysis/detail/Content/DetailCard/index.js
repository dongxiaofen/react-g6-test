import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import DetailTable from 'components/common/report/alertAnalysis/DetailTable';

function DetailCard({meta}) {
  const createCard = () => {
    const output = [];
    meta.items.map((itemData, rowIdx)=>{
      output.push(
        <DetailTable key={`${rowIdx}Card`} itemData={itemData} rowIdx={rowIdx} {...meta}/>
      )
    });
    return output;
  }
  return (
    <div>
      {
        createCard()
      }
    </div>
  );
}

DetailCard.propTypes = {
  foo: PropTypes.string,
};
export default observer(DetailCard);
