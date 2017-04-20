用法
````
    payModalStore.openCompModal({
      'modalType': 'createMonitor',//continueMonitor,createMonitor   不一样的modalType会有不一样的标题
      'width': '560px',//弹出框宽度
      'pactName': '用户服务协议',
      'pactUrl': '/',协议地址
      'pointText': '创建报告即视为同意',
      'callBack': choiceOk 回调函数，用于点击确定以后请求后台
    });
````