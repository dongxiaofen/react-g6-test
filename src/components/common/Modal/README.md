# modal

## 介绍
有两种`modal`  

一种是默认的  
该`modal`调用的是异步组件  
有`title`、`comp`、确定按钮、取消按钮  

另一种是`isCustomize`自定义`modal`  
就只有一个关闭的叉叉

## `store`方法
```
/*
@param title // 标题
@param width // 宽度，默认440
@param confirmText // 确定按钮文本，默认确定
@param cancelText // 取消按钮文本，默认取消
@param confirmAction // 确定按钮事件
@param cancelAction // 取消按钮事件
@param closeAction // 关闭按钮事件，默认是隐藏modal
@param confirmLoading // 确定按钮loading，默认false
@param cancelLoading // 取消按钮loading，默认false
@param loader // 异步组件
*/

// 请用结构化赋值，这样可以不用每个参数都传进来
openCompModal({
  title,
  width,
  isCustomize,
  cancelText,
  confirmText,
  confirmAction,
  cancelAction,
  closeAction,
  cancelLoading,
  confirmLoading,
  loader
})

// 列子，这是一个show modal的按钮事件
openCompModal = () => {
  const modalStore = this.props.modalStore;
  const args = {
    title: '测试看comp modal有没有出来',
    confirmAction: confirmAction,
    cancelAction: cancelAction,
    isCustomize: true,
    loader: (cb) => {
      require.ensure([], (require) => {
        cb(require('./test'));
      });
    }
  };
  modalStore.openCompModal({ ...args });
}

```
