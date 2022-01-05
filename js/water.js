$(window).on('load',function(){
	waterfull();
	var dataInt={"data":[{"src":"30.jpg"},{"src":"31.jpg"},{"src":"32.jpg"},{"src":"33.jpg"},{"src":"34.jpg"},{"src":"35.jpg"}]};
	$(window).on("scroll",function(){
		if(checkScrollslide()){
		$.each(dataInt.data,function(index,value){
			var obox=$("<div>").addClass("box").appendTo($("#main"));
			var opic=$("<div>").addClass("pic").appendTo($(obox));
			$("<img>").attr("src","img/waterfall/"+$(value).attr("src")).appendTo($(opic));
		})
		waterfull();
		}
	})	
})

function waterfull(){
	var $boxs=$("#main>div");
	var w=$boxs.eq(0).outerWidth();
	//计算整个页面显示的列数
	var cols=Math.floor($(window).width()/w);
	//设置div#main的宽度
	$("#main").width(w*cols);
	var hArr=new Array();
	$boxs.each(function(index,value){
		var h=$(value).outerHeight();
		if(index<cols){
			hArr.push(h);
		}else{
		//找到数组中的最小值
		var minH=Math.min.apply(null,hArr);
		var minHindex=$.inArray(minH,hArr);
		//定位数据块
		$(value).css({"top":minH+"px","left":w*minHindex+"px","position":"absolute"});
		hArr[minHindex]+=$(value).outerHeight();
		}
	})	
}

function checkScrollslide(){
	var $lastboxs=$("#main>div").last();
	var $boxH=$lastboxs.offset().top+Math.floor($lastboxs.outerHeight()/2);
	var $pageH=$(window).scrollTop()+$(window).height();
	return ($boxH<$pageH)?true:false
}