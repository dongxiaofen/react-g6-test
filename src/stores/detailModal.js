import { observable, action, runInAction } from 'mobx';
class DetailModalStore {
  @observable visible = false;
  @observable closeAction;
  @observable titleComp;
  @observable contentComp;
  @observable sourceComp;

  @action.bound closeDefalutAction() {
    this.visible = false;
  }

  @action.bound openDetailModal(_closeAction, loader) {
    loader((_titleComp, _contentComp, _sourceComp) => {
      runInAction(() => {
        this.titleComp = _titleComp;
        this.contentComp = _contentComp;
        if (_sourceComp) { this.sourceComp = _sourceComp; }
      });
    });
    this.visible = true;
    this.closeAction = _closeAction;
  }
}
export default new DetailModalStore();
