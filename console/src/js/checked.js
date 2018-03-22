checkboxKit:function (args) {
			args = args || {};
			var btnAll = $(args.allButton),
				filterExp = args.filterExp || '',
				color = args.color || '#ff9';
			return this.each(function () {
				var $s = $(this),
					checkbox = $s.find('[name='+args.name+']'+filterExp+'').not(btnAll);
				$s.click(function (e) {
					var tar = e.target;
					var isbtnAll = (btnAll.filter(function (idx) {return this===tar;}).length>0);

					if(tar && tar.tagName && tar.name===args.name && !isbtnAll) {
						(function () {
							var $tar = $(tar);

							if(tar.checked) {
								$tar.lightTR('on',color);
							}else {
								$tar.lightTR('off',color);
							}
						})();
						//console.log('ok');
					}else if(isbtnAll) {
						if(tar.checked) {
							checkbox.lightTR('on',color);
						}else {
							checkbox.lightTR('off',color);
						}
					}
				});
				checkbox.click(function () {
					var chkCount = 0;
					checkbox.each(function(){
						if(this.checked) chkCount+=1;
					});
					btnAll.attr({'checked':(chkCount > 0 && checkbox.size() == chkCount)});
				});
			});
		},
		
		
		
		
		$(function () {
				$('.tab-lists').checkboxKit({
				  allButton:'#J_ChooseBoxAll',
				  name:'id'
		});