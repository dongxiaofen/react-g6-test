import React from 'react';
import { observer, inject } from 'mobx-react';
import Modal from 'components/lib/Modal';
import Select from 'components/lib/Select';
import Input from 'components/lib/input';
import Button from 'components/lib/button';
import styles from './index.less';
const Option = Select.Option;
function AddRealation({useForm, addRelationStore}) {
  const titleDict = {
    monitorList: '新增关联监控',
    network: '添加关联关系'
  };
  const title = titleDict[useForm];
  const params = addRelationStore.params;
  const closeAction = () => {
    addRelationStore.resetParams();
  };
  const inputChange = (evt) => {
    addRelationStore.changeParams({name: evt.target.value});
  };
  const selectChange = (value) => {
    addRelationStore.changeParams({type: value});
  };
  const createFunc = () => {
    if (params.name !== '') {
      addRelationStore.submitForm(useForm);
    }
  };
  return (
    <Modal
      visible={!!params.monitorId}
      width="440px"
      closeAction={closeAction}
      isCustomize>
      <div className={styles.modalCon}>
        <div className={styles.modalTitle}>{title}</div>
        <Input
          className={styles.nameInput}
          onChange={inputChange}
          value={params.name}
          placeholder="请输入关联企业名称" />
        <Select
          defaultValue={params.type}
          width="100%"
          className={styles.typeSelect}
          onChange={selectChange}
          value={params.type}>
          <Option value="USER_SUPPLIER">供应商</Option>
          <Option value="USER_CUSTOMER">客户</Option>
        </Select>
        <Button
          className={styles.submitButton}
          btnType="primary"
          onClick={createFunc}
          loading={params.loading}>
          创建
        </Button>
      </div>
    </Modal>
  );
}
export default inject('addRelationStore')(observer(AddRealation));
