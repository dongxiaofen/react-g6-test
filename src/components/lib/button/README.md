# 用法介绍

  btnType string
  按钮样式类型，默认  1：default灰色空心样式   2：primary 蓝色实心样式  3：secondary 蓝色空心样式

  className string
  用户自定义样式，默认为空

  loading bool
  按钮loading状态，默认false, 为true时按钮会有一个fa-spinner的loading状态，并阻止点击事件

  disabled bool
  按钮disabled状态，默认false, 为true时按钮为禁用样式，并阻止点击事件

  children any
  按钮内容

  onClick function
  按钮点击事件监听函数，传入event作为参数
