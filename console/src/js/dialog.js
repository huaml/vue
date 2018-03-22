// 删除文件
function deleteFiles() {
    bootbox.alert({
        size: 'small',
        message: '请选择需要操作的项！',
        callback: function() {
            
        },
        title: "系统提示"
    });
}

// 删除单个文件
function deleteFile() {
    bootbox.confirm({
        size: 'small',
        message: '您确定要删除吗？',
        callback: function(result) {
            
        },
        title: "确认信息"
    });
}

// 允许嵌入访问
function changeEmbeddableState() {
    bootbox.confirm({
        size: 'small',
        message: '您确定要将“我的文档”资料库设为可嵌入访问状态吗？',
        callback: function(result) {
            
        },
        title: "确认信息"
    });
}

// 立即执行
function immediateExecution() {
    bootbox.confirm({
        size: 'small',
        message: '确定要手动运行该任务？',
        callback: function(result) {
            
        },
        title: "确认信息"
    });
}

// 禁止自动执行
function disableAutoExecution() {
    bootbox.confirm({
        size: 'small',
        message: '你确定要关闭自动执行？',
        callback: function(result) {
            
        },
        title: "确认信息"
    });
}