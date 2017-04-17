import React, {Component, PropTypes} from 'react';
import DICT from '../../../../config/Dict/reportModule';
import {Col} from 'components/common/Layout';
import styles from './jobCard.less';
export default class JobCard extends Component {
  static propTypes = {
    data: PropTypes.object
  };
  handleValue(key, value) {
    if (key === 'salary' && Number(value) === 0) {
      return '面议';
    }
    return value;
  }
  createItem= (origData, itemData) => {
    const output = [];
    origData.config.map((key)=>{
      if (itemData[key] !== '') {
        output.push(`${DICT[origData.dict][key]}（${this.handleValue(key, itemData[key])}）`);
      }
    });
    return <span className={styles.text}>{output.join('；')}</span>;
  }
  createCard = (origData) => {
    const output = [];
    const firstKey = origData.firstKey;
    origData.items.map((itemData)=>{
      output.push(
        <Col width="4">
          <div className={styles.itemWrap}>
            <div className={styles.firstItem}>
              <a href={itemData.url} target="_blank">
                <span>{DICT[origData.dict][firstKey]}:</span>
                <span>{itemData[firstKey] ? itemData[firstKey] : '无'}</span>
              </a>
            </div>
            {this.createItem(origData, itemData)}
          </div>
        </Col>
      );
    });
    return output;
  }
  render() {
    const data = this.props.data;
    return (
      <div>
        <div className={styles.content}>
          {this.createCard(data)}
        </div>
      </div>
    );
  }
}
