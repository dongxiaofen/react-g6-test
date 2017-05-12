import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function NowRecordList({nowRecordStore}) {
  // 点击图片事件
  const imgClick = (idx, img, id) => {
    nowRecordStore.imgContent(idx, img, id);
  };
  const dataList = nowRecordStore.dataList;
  const listDom = [];
  // 列表Dom
  if (dataList && dataList.length > 0) {
    dataList.map((obj, idx)=>{
      // 图片
      const pictures = [];
      if (obj.pictures) {
        obj.pictures.map((img, id)=>{
          pictures.push(
            <img
              onClick={imgClick.bind(null, idx, img, id)}
              key={`${id}img`}
              alt=""
              src={'data:image/png;base64,' + img} />
          );
        });
      }
      // 列表
      if (obj.item) {
        listDom.push(
          <div key={`${idx}record`} className={styles.single}>
            <div className={styles.head}>
              <div className={styles.title}>
                {obj.item.title ? obj.item.title : '暂无标题'}
              </div>
              <div className={styles.dateTime}>
                时间：{obj.item.createTs ? obj.item.createTs : '无'}
              </div>
              <div className={styles.person}>
                操作人：{obj.item.userName ? obj.item.userName : '无'}
              </div>
            </div>
            <div className={styles.content}>
              {obj.item.content ? obj.item.content : '暂无内容'}
            </div>
            <div className={pictures.length > 0 ? styles.imgWrap : styles.displayNone}>
              {pictures}
            </div>
            <div className={styles.address}>
              <i className={styles.icon + ' fa fa-map-marker '}></i>
              <span>{obj.item.location ? obj.item.location : '暂无地址'}</span>
            </div>
          </div>
        );
      }
    });
  }
  return (
    <div className={styles.box}>
      <div className={styles.wrapCon}>
        {listDom}
      </div>
    </div>
  );
}

NowRecordList.propTypes = {
  nowRecordStore: PropTypes.object,
};
export default observer(NowRecordList);
