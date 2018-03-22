// 表单验证
$(function () {
    $("form.required-validate").each(function() {
        var $form = $(this);
        $form.bootstrapValidator({
            message: '此值无效',
     		feedbackIcons: {
                valid: 'fa fa-check',
                invalid: 'fa fa-remove',
                validating: 'fa fa-refresh'
            },
            fields: {
            	fileName: {
                    validators: {
                        regexp: {
                            regexp: /^[^\/\\\:\*\?"<>\|]+$/,
                            message: '文件名不能包含特殊符号'
                        }
                    }
                },
                ipAddr: {
                    validators: {
                        ip: {
                            ipv4: true,
                            message: '请输入有效的IP地址'
                        }
                    }
                },
                macAddr: {
                    validators: {
                        mac: {
                            message: '请输入有效的MAC地址'
                        }
                    }
                },
                messageTitle: {
                	validators: {
    	            	stringLength: {
    	                    min: 3,
    	                    max: 50,
    	                    message: '消息主题长度在3~50个字'
    	                }
    	            }
                },
                messageContent: {
                	validators: {
    	            	stringLength: {
    	                    min: 3,
    	                    max: 500,
    	                    message: '消息内容长度在3~500个字'
    	                }
    	            }
                },
                name: {
                	validators: {
    	            	stringLength: {
    	                    min: 3,
    	                    max: 50,
    	                    message: '名称长度在3~50个字'
    	                }
    	            }
                },
                srcPath: {
                	validators: {
    	            	stringLength: {
    	                    min: 3,
    	                    message: '长度不能小于3个字符'
    	                }
    	            }
                },
                typeName: {
                	validators: {
    	            	stringLength: {
    	                    min: 3,
    	                    max: 10,
    	                    message: '名称长度在3~10个字'
    	                }
    	            }
                },
                extendName: {
                	validators: {
    	            	stringLength: {
    	                    min: 3,
    	                    max: 250,
    	                    message: '名称长度在3~250个字'
    	                }
    	            }
                },
                website: {
                    message: '请输入有效的url',
                    validators: {
                        uri: {}
                    }
                },
                appKey: {
                    validators: {
                        stringLength: {
                            min: 16,
                            max: 32,
                            message: 'apikey为16-32个字符'
                        }
                    }
                },
                apiSecret: {
                    validators: {
                        stringLength: {
                            min: 16,
                            max: 16,
                            message: 'apiSecret为16个字符'
                        }
                    }
                },
                bandWidth: {
                    validators: {
                        regexp: {
                            regexp: /^(0|[1-9]{1}[0-9]{1,4}|100000)$/,
                            message: '限制最大带宽在范围之外'
                        }
                    }
                },
                port: {
                    validators: {
                        regexp: {
                            regexp: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
                            message: '请输入有效的端口号'
                        }
                    }
                },
                domainName: {
                    validators: {
                        regexp: {
                            regexp: /([a-z0-9][a-z0-9\-]*?\.(?:com|cn|net|org|gov|info|la|cc|co)(?:\.(?:cn|jp))?)$/,
                            message: '请输入有效的域名'
                        }
                    }
                },
                numeric: {
                    validators: {
                        numeric: {
                          message: '请输入数值'
                        }
                    }
                },
                id: {
                    validators: {
                        greaterThan: {
                            value: 1,
                            message: 'ID必须为大于或等于1的数值'
                        }
                    }
                },
                syncContentCK: {
                   validators: {
                        choice: {
                            min: 1,
                            message: '请至少选择一项'
                        }
                    } 
                }
            }
        });
    });

    $('.modal-footer button[type=submit]').click(function() {
        $('form.required-validate').bootstrapValidator('validate');
    });

    $('.modal-footer .btn-default').click(function() {
        $('form.required-validate').data('bootstrapValidator').resetForm(true);
    });

	$("[data-toggle='datetime']").datetimepicker({
	    language:  'cn',
	    fontAwesome: 'fa',
	    weekStart: 1,
	    todayBtn:  1,
	    autoclose: 1,
	    todayHighlight: 1,
	    startView: 2,
	    forceParse: 0,
	    showMeridian: 1
  	});
});