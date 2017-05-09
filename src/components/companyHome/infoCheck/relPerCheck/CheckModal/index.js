import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Modal from 'components/lib/Modal';
import { runInAction } from 'mobx';

function CheckModal({visible, width, closeAction, btnLoading, relPerCheckStore, routing, pointText, pactUrl, pactName}) {
  const relatedType = relPerCheckStore.relatedType;
  const relatedTypeModelStatus = relPerCheckStore.relatedTypeModelStatus;
  // 姓名
  const relatedName = relPerCheckStore.relatedName;
  const relatedNameModelStatus = relPerCheckStore.relatedNameModelStatus;
  const reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
  // 点击下拉选择
  const clickHandle = (value, type)=>{
    if (type === 'type') {
      runInAction('select relatedType', () => {
        relPerCheckStore.relatedType = value;
        relPerCheckStore.relatedTypeModelStatus = false;
      });
    } else {
      runInAction('select relatedType', () => {
        relPerCheckStore.relatedName = value;
        relPerCheckStore.relatedNameModelStatus = false;
      });
    }
  };
  // 输入idCard
  const changeIdCard = (evt)=>{
    runInAction('input idCard', () => {
      relPerCheckStore.relatedIdCard = evt.target.value;
    });
  };

  // 输入relatedType
  const changeRelatedType = (evt)=>{
    runInAction('input relatedType', () => {
      relPerCheckStore.relatedType = evt.target.value;
    });
  };
  // onFocusStyle
  const onFocusStyle = (modle, modle2) => {
    runInAction('修改对应模块状态', () => {
      relPerCheckStore[modle] = true;
      relPerCheckStore[modle2] = true;
    });
  };

  const onBlurStyle = (modle) => {
    runInAction('修改对应模块状态', () => {
      relPerCheckStore[modle] = false;
    });
  };

  // validat

  // 输入relatedName
  const changeRelatedName = (evt)=>{
    runInAction('input relatedName', () =>{
      relPerCheckStore.relatedName = evt.target.value;
    });
  };

  // 打开type下拉选项
  const onFocusRelatedType = ()=>{
    runInAction('change ModelStatus', () => {
      relPerCheckStore.relatedTypeModelStatus = true;
    });
  };

  // 打开name下拉选项
  const onFocusRelatedName = ()=>{
    runInAction('change relatedNameModelStatus', () => {
      relPerCheckStore.relatedNameModelStatus = true;
    });
  };

  // 关闭下拉选项
  const onBlurRelated = (moudel)=>{
    //  设置关联关系blur的样式状态
    onBlurStyle(moudel);
    runInAction('change relatedNameModelStatus', () => {
      relPerCheckStore.relatedTypeModelStatus = false;
      relPerCheckStore.relatedNameModelStatus = false;
    });
  };
  // const checkStatus = ({validate, errorTips, tips, isClick, isFocus}) => {
  //   if (relPerCheckStore.relatedSubmit && validate) {
  //     return (<div className={styles.validate}>{errorTips}</div>);
  //   }
  //   if (isFocus) {
  //     return (<div className={styles.focusStyle}>{tips}</div>);
  //   }
  //   if (isClick) {
  //     return (<div className={styles.normal}>{tips}</div>);
  //   }
  //   return <div className={styles.hiddenTittle}>{tips}</div>;
  // };
  // 提交
  const submitClick = ()=>{
    // reportId
    let reportId = '';
    const params = {
      id: relPerCheckStore.relatedIdCard,
      name: relPerCheckStore.relatedName,
      relationType: relPerCheckStore.relatedType,
    };
    let idCardBool = true;
    if (reg.test(relPerCheckStore.relatedIdCard) === false) {
      idCardBool = false;
    }
    if (relPerCheckStore.relatedType.length > 0 && relPerCheckStore.relatedName.length > 0 && idCardBool) {
      if (routing.location.query.monitorId) {
        reportId = routing.location.query.monitorId;
        relPerCheckStore.submitRelated(`/api/monitor/${reportId}/person`, params);
      } else {
        reportId = routing.location.query.reportId;
        relPerCheckStore.submitRelated(`/api/report/${reportId}/person`, params);
      }
    }
    runInAction('change relatedSubmit status', () => {
      relPerCheckStore.relatedSubmit = true;
    });
  };
  let idCardBool = true;
  if (reg.test(relPerCheckStore.relatedIdCard) === false) {
    idCardBool = false;
  }    // 身份证号
  const relatedIdCard = relPerCheckStore.relatedIdCard;
  let idCardText = '请输入正确的身份证号码';
  if (relatedIdCard.length < 1) {
    idCardText = '身份证号码必填';
  }
  console.log(idCardText);
  // 默认姓名数据
  const relatedNameData = relPerCheckStore.relatedNameData;
  const relatedNameDom = [];
  if (relatedNameData.length > 0) {
    relatedNameData.map((item, index)=> {
      relatedNameDom.push(
        <li key={`${index}related`} onClick={clickHandle.bind(this, item, 'name')}>
          {item}
        </li>
      );
    });
  }
  return (
    <div>
      <Modal visible={visible}
             isSingleBtn
             width={width}
             closeAction={closeAction}
             confirmAction={submitClick}
             confirmLoading={btnLoading}
             isNeedBtn
             pactUrl={pactUrl}
             pactName={pactName}
             pointText={pointText}
             title="关联人核查"
             confirmText= "核查">
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          {
          //  checkStatus({
          //    tips: '关联关系',
          //    validate: relPerCheckStore.relatedType.length < 1,
          //    isClick: relPerCheckStore.relationshipShow,
          //    isFocus: relPerCheckStore.relationship,
          //    errorTips: '关联关系必填'})
          }
          <div
            tabIndex="1"
            onFocus={onFocusRelatedType.bind(this)}
            className={styles.contentSingle}>
            <div className={styles.normal}>关联关系</div>
            <input
              onChange={changeRelatedType.bind(this)}
              onBlur={onBlurRelated.bind(this, 'relationship')}
              onFocus={onFocusStyle.bind(this, 'relationship', 'relationshipShow')}
              className={relPerCheckStore.relatedSubmit === true && relPerCheckStore.relatedType.length < 1 ? styles.inputClassError : styles.inputClass}
              value={relatedType}
              placeholder="" />
            <div className={relatedTypeModelStatus ? styles.listWrap : styles.hidden}>
              <ul>
                <li onClick={clickHandle.bind(this, '实际控制人', 'type')}>实际控制人</li>
                <li onClick={clickHandle.bind(this, '法人代表', 'type')}>法人代表</li>
                <li onClick={clickHandle.bind(this, '个人股东', 'type')}>个人股东</li>
                <li onClick={clickHandle.bind(this, '董事', 'type')}>董事</li>
                <li onClick={clickHandle.bind(this, '监事', 'type')}>监事</li>
                <li onClick={clickHandle.bind(this, '高管', 'type')}>高管</li>
                <li onClick={clickHandle.bind(this, '历史关联', 'type')}>历史关联</li>
              </ul>
            </div>
          </div>
          {
            // checkStatus({
            //   tips: '姓名',
            //   validate: relPerCheckStore.relatedName.length < 1,
            //   isClick: relPerCheckStore.personNameShow,
            //   isFocus: relPerCheckStore.personName,
            //   errorTips: '姓名必填'})
          }
          <div
            tabIndex="1"
            onFocus={onFocusRelatedName.bind(this)}
            className={styles.contentSingle}
            onBlur={onBlurRelated.bind(this)}>
            <div className={styles.normal}>姓名</div>
            <input
              onChange={changeRelatedName.bind(this)}
              onBlur={onBlurStyle.bind(this, 'personName')}
              onFocus={onFocusStyle.bind(this, 'personName', 'personNameShow')}
              className={relPerCheckStore.relatedSubmit === true && relPerCheckStore.relatedName.length < 1 ? styles.inputClassError : styles.inputClass}
              value={relatedName}
              placeholder="" />
            <div className={relatedNameModelStatus ? styles.listWrap : styles.hidden}>
              <ul>
                {relatedNameDom}
              </ul>
            </div>
          </div>
          {
          //  checkStatus({
          //    tips: '身份证号码',
          //    validate: !idCardBool,
          //    isClick: relPerCheckStore.idCardShow,
          //    isFocus: relPerCheckStore.idCardStatus,
          //    errorTips: idCardText})
          }
          <div className={styles.contentSingle}>
          <div>身份证号</div>
          <input
            className={relPerCheckStore.relatedSubmit === true && idCardBool === false ? styles.inputClassError : styles.inputClass}
            onChange={changeIdCard.bind(this)}
            onBlur={onBlurStyle.bind(this, 'idCardStatus')}
            onFocus={onFocusStyle.bind(this, 'idCardStatus', 'idCardShow')}
            value={relatedIdCard}
            placeholder="" />
          </div>
        </div>
      </div>
      </Modal>
    </div>
  );
}

CheckModal.propTypes = {
  foo: PropTypes.string,
};
export default inject('routing')(observer(CheckModal));
