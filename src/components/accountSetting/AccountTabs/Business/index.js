import React from 'react';
import { observer } from 'mobx-react';
import ChartBox from './ChartBox';
import NewBusiness from './NewBusiness';
import ProvinceRank from './ProvinceRank';
import IndustryDist from './IndustryDist';
import ScaleDist from './ScaleDist';
import styles from './index.less';
function Business(props) {
  return (
    <div className={styles.wrapper}>
      <ChartBox componentName="newBusiness">
        <NewBusiness {...props} />
      </ChartBox>
      <ChartBox componentName="scaleDist">
        <ScaleDist {...props} />
      </ChartBox>
      <ChartBox componentName="industryDist">
        <IndustryDist {...props} />
      </ChartBox>
      <ChartBox componentName="provinceRank">
        <ProvinceRank {...props} />
      </ChartBox>
    </div>
  );
}
export default observer(Business);
