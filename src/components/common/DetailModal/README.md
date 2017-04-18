# detaiModal

## 调用方式
也是操作对应的`store`  
```
// closeAction可以不传，主要看下面的例子
openDetailModal(loader, closeAction)
// 例子
openDetailModal = () => {
  const detailModalStore = this.props.detailModalStore;
  detailModalStore.openDetailModal(
    (cb) => {
      require.ensure([], (require) => {
        cb(
          require('./title'),
          require('./content'),
          // 如果没有来源，可以不传
          require('./source')
        );
      });
    }
  );
}
```
