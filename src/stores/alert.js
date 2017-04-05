import { observable, action, reaction } from 'mobx';
class AlertStore {
  @observable show = false;
  @observable type = '';
  @observable message = '';
  @observable closeFunc;
  constructor() {
    reaction(
      () => this.show,
      show => {
        if (show) {
          setTimeout(() => {
            this.toggleStatus();
          }, 5000);
        }
      }
    );
  }
  @action.bound combineServerData(data) {
    this.show = data.show;
  }
  @action.bound toggleStatus() {
    this.show = !this.show;
  }
  @action.bound showAlert(type, message, closeFunc) {
    this.show = true;
    this.type = type;
    this.message = message;
    this.closeFunc = closeFunc;
  }
}
export default new AlertStore();
