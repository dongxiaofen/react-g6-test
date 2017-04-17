import { observable, action } from 'mobx';
import { addRelationApi } from 'api';
class AddRelationStore {
  @observable params = {
    monitorId: '',
    name: '',
    type: 'USER_SUPPLIER',
  };
  @action.bound changeParams(keyValue) {
    Object.assign(this.params, keyValue);
  }
  @action.bound submitForm() {
    const { monitorId, name, type } = this.params;
    addRelationApi.addRelation(monitorId, {name, type})
      .then(action('addRelation_success', resp => {
        console.log(resp);
      }))
      .catch(action('addRelation_error', err => {
        console.log(err);
      }));
  }
}
export default new AddRelationStore();
