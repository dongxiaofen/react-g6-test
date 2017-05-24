用法
````
// 宽度默认504px,小框选择420px这两种尺寸就够了

    payModalStore.openCompModal({
      'modalType': 'createMonitor',//continueMonitor,createMonitor   不一样的modalType会有不一样的标题
      'width': '504px',//弹出框宽度
      'pointText': '创建报告即视为同意',
      'callBack': choiceOk 回调函数，用于点击确定以后请求后台
      'monitorType':'MONITOR' 选择监控报告的类型，默认是 MONITOR
      'choiceMonitorType': 触发选择监控类型的函数
      'isSingleBtn': 是否只要一个按钮，默认false
      'isRenewal':是否是续期默认false
      'isComboRenewal'是否是套餐
    });
````
####如果是套餐续期要要传 sComboRenewal
####点数续期 isRenewal
