import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleRange({data}) {
  let industry = '';
  let area = '';
  let scale = '';
  if (data && data.rule) {
    // 行业
    if (data.rule.industry && data.rule.industry.name) {
      industry = data.rule.industry.name + '，';
    }
    // 地区
    if (data.rule.area) {
      area = data.rule.area + '，';
    }
    // 规模
    if (data.rule.scale) {
      switch (data.rule.scale) {
        case 'UNLIMITED':
          scale = '规模不限';
          break;
        case 'FIRST_LEVEL':
          scale = '1-10人';
          break;
        case 'SECOND_LEVEL':
          scale = '10-50人';
          break;
        case 'THIRD_LEVEL':
          scale = '50-150人';
          break;
        case 'FORTH_LEVEL':
          scale = '150-500人';
          break;
        case 'FIFTH_LEVEL':
          scale = '500-1000人';
          break;
        case 'SIXTH_LEVEL':
          scale = '1000人以上';
          break;
        case 'SEVENTH_LEVEL':
          scale = '2000人以上';
          break;
        case 'EIGHTH_LEVEL':
          scale = '5000人以上';
          break;
        case 'NINTH_LEVEL':
          scale = '10000人以上';
          break;
        default:
          break;
      }
    }
  }
  return (
    <div className={styles.box}>
      应用企业范围：{industry}{area}{scale}
    </div>
  );
}

RuleRange.propTypes = {
  data: PropTypes.object,
};
export default observer(RuleRange);
