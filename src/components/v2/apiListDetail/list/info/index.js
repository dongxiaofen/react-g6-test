import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Button from 'components/lib/button';
import { Popover, Icon } from 'antd';
import styles from './index.less';
const Info = ({apiListDetailStore, routing}) => {
  const activeApiDetail = apiListDetailStore.activeApiDetail;
  const gotoTest = () => {
    routing.push({
      pathname: '/test',
      query: {id: activeApiDetail.id}
    });
  };
  const getChargeType = (type) => {
    const config = {
      BY_CHARGE: '按次收费',
      MONTH_CHARGE: '按月收费',
      ACCORDE_CHARGE: '按条收费'
    };
    return config[type];
  };
  const popCont = (<div className={styles.popCont}>您未开通该接口，请联系商务人员，我们会立即为你办理，联系电话：400-139-1819，邮箱：info@socialcredits.cn。</div>);
  return (
    <div className={styles.infoCont}>
      <div className={styles.info}>
        <div className={styles['info-item']} style={{width: '180px'}}>
          <label className={styles.label}>状态</label>
          <div className={styles['item-cont']}>
            {activeApiDetail.applied > 0 ? '已申请' :
              <Popover content={popCont}>
                未申请
                <span className={styles.popBox}>
                  <Icon type="question-circle-o" />
                </span>
              </Popover>}
          </div>
        </div>
        <div className={styles['info-item']} style={{width: '180px'}}>
          <label className={styles.label}>资费</label>
          <div className={styles['item-cont']}>{getChargeType(activeApiDetail.chargesType)}</div>
        </div>
        <div className={styles['info-item']} style={{width: '180px'}}>
          <label className={styles.label}>分类</label>
          <div className={styles['item-cont']}>{activeApiDetail.classification}</div>
        </div>
        <div className={styles['info-item']} style={{width: '100%'}}>
          <label className={styles.label}>描述</label>
          <div className={styles['item-cont']}>{activeApiDetail.description}</div>
        </div>
      </div>
      <div className={styles['btn-wrap']}>
        <Button btnType="primary" className={styles.btn} disabled={activeApiDetail.applied === 0} onClick={gotoTest}>测试接口</Button>
      </div>
    </div>
  );
};
Info.propTypes = {
  routing: PropTypes.object,
  apiListDetailStore: PropTypes.object,
};
export default inject('apiListDetailStore', 'routing')(observer(Info));
