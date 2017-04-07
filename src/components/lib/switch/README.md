# 用法介绍

  status bool
  组件状态 默认false false时为关闭 ==> 保持灰色 icon在左侧 true时为开启 ===> 保持蓝色 icon在右侧

  loading bool
  组件loading状态， 默认false, 为true时整个组件显示为一个spinner

  disabled bool
  组件禁用状态， 显示为灰色，点击事件不可用

  onChange function
  点击切换事件的回调函数，以修改后的状态值为参数
