import { observable, action } from 'mobx';
import monitorListStore from './monitorList';
import messageStore from './message';
import { addRelationApi } from 'api';
class AddRelationStore {
  @observable params = {
    monitorId: '',
    name: '',
    type: 'USER_SUPPLIER',
    loading: false,
  };
  @action.bound changeParams(keyValue) {
    Object.assign(this.params, keyValue);
  }
  @action.bound resetParams() {
    this.params = {
      monitorId: '',
      name: '',
      type: 'USER_SUPPLIER',
      loading: false,
    };
  }
  @action.bound submitForm(useForm) {
    this.params.loading = true;
    const { monitorId, name, type } = this.params;
    addRelationApi.addRelation(monitorId, {name, type})
      .then(action('addRelation_success', resp => {
        console.log(resp);
        this.resetParams();
        if (useForm === 'monitorList') {
          monitorListStore.getMainCount();
          monitorListStore.getRelationList(monitorId);
        }
      }))
      .catch(action('addRelation_error', err => {
        messageStore.openMessage({
          type: 'error',
          content: err.response && err.response.data && err.response.data.message || '创建失败',
        });
        this.resetParams();
      }));
  }
}
export default new AddRelationStore();
