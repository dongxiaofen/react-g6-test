import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import styles from './index.less';

function RiskFeaturesExplain({}) {
  return (
    <div className={styles.box}>
      <ModuleTitle module="风险特征说明" />
      <div>
        <p>特征，就是群体特性的抽象结果。</p>
        <p>某一群体具有某一独有特征，也就说明该特征往往只出现在这一群体中。</p>
        <p>因此，我们可以利用这些独有特征，作为划分群体的预测标准。</p>
        <p>将企业划分为经营良好的白名单企业以及失信黑名单企业，遍历所有主体企业及其关联关系所发生的历史事件行为，我们去寻找黑名单企业所独有的风险特征，那么一旦某企业具有该风险特征，则有很大概率会发生风险。</p>
        <p>下图为我们在某公司的事件行为中，寻找到一个风险特征过程的简单示意图：</p>
        <p>
          imges
        </p>
      </div>
    </div>
  );
}

RiskFeaturesExplain.propTypes = {
  foo: PropTypes.string,
};
export default observer(RiskFeaturesExplain);
