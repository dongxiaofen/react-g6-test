import { observable, action } from 'mobx';
import monitorListStore from './monitorList';
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
        this.params = {
          monitorId: '',
          name: '',
          type: 'USER_SUPPLIER',
          loading: false,
        };
        if (useForm === 'monitorList') {
          monitorListStore.getMainCount();
          monitorListStore.getRelationList(monitorId);
        }
      }))
      .catch(action('addRelation_error', err => {
        console.log(err);
        this.params = {
          monitorId: '',
          name: '',
          type: 'USER_SUPPLIER',
          loading: false,
        };
      }));
  }
}
export default new AddRelationStore();
