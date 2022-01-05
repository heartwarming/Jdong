var scrollNews = function(config){
	var D = document, 
	unitTag = config.items ? config.items : 'li', 
	cloneTag = config.cloneTag ? config.cloneTag : 'div', 
	copydiv = null, 
	oSelf = this, 
	isString = function(s){
		    return typeof s === 'string';
	};
	/* 代码整理：js代码 www.jsdaima.com */
	this.scrollArea = isString(config.area) ? document.getElementById(config.area) : config.area;
	this.scrollMsg = isString(config.msg) ? document.getElementById(config.msg) : config.msg;
	this.items = this.scrollMsg.getElementsByTagName(unitTag);
	this.length = this.items.length;
	this.itemWidth = this.items[0].offsetWidth;
	this.width = this.itemWidth * this.length;
	this.itemHeight = this.items[0].offsetHeight;
	this.height = this.itemHeight * this.length;
	
	if(config.direction){
		this.direction = config.direction.toUpperCase();
	}
	if (config.pauseTime) {
		this.pauseTime = config.pauseTime;
	}
	if (config.chgUnitTime) {
		this.chgUnitTime = config.chgUnitTime;
	}
	if(config.speed){
		this.speed = config.speed;
	}
	
	this.scrollMsg.style.position = 'absolute';
	this.scrollMsg.style.top = '0';
	this.scrollMsg.style.left = '0';
	
	copydiv = document.createElement('div');
	copydiv.id = oSelf.scrollArea.id + '_copymsgid';
	
	if (this.direction === 'V') {
		copydiv.style.height = oSelf.height + 'px';
		copydiv.style.left = '0';
		copydiv.style.top = oSelf.height + 'px';
	}
	else {
		copydiv.style.width = oSelf.width + 'px';
		copydiv.style.left = oSelf.width + 'px';
		copydiv.style.top = '0';
	}
	copydiv.style.position = 'absolute';
	
	copydiv.innerHTML = this.scrollMsg.innerHTML;
	this.scrollArea.appendChild(copydiv);
	this.copyMsg = copydiv;
};

scrollNews.prototype.scrollArea = null;
scrollNews.prototype.scrollMsg = null;
scrollNews.prototype.copyMsg = null;
scrollNews.prototype.items = null;
scrollNews.prototype.length = 0;
scrollNews.prototype.itemWidth = 0;
scrollNews.prototype.itemHeight = 0;
scrollNews.prototype.width = 0;
scrollNews.prototype.height = 0;
scrollNews.prototype.scrollValue = 0;
scrollNews.prototype.scrollWidth = 0;
scrollNews.prototype.scrollHeight = 0;
scrollNews.prototype.direction = 'V';
scrollNews.prototype.isPause = true;
scrollNews.prototype.scrollTimer = null;
scrollNews.prototype.chgUnitTime = 4000;
scrollNews.prototype.pauseTime = 2000;
scrollNews.prototype.speed = 50;
scrollNews.prototype.lastIndex = 0;

scrollNews.prototype.play = function(){
	var oSelf = this, anim = function(){
		var dist = 0;
		if (oSelf.scrollTimer) {
			clearTimeout(oSelf.scrollTimer);
		}
		if (oSelf.isPause) {
			oSelf.scrollTimer = setTimeout(anim, oSelf.speed);
			return;
		}
		if (oSelf.direction === 'V') {
			if ((oSelf.itemHeight * oSelf.lastIndex - oSelf.scrollValue) <= 0) {
				oSelf.scrollValue = 0;
			}
			else {
				dist = Math.ceil(((oSelf.itemHeight * oSelf.lastIndex) - oSelf.scrollValue) / 10);
				oSelf.scrollValue += dist;
				oSelf.scrollHeight += dist;
			}
			oSelf.scrollArea.scrollTop = oSelf.scrollValue;
			if (oSelf.scrollHeight % oSelf.itemHeight === 0) {
				oSelf.lastIndex += 1;
				if (oSelf.lastIndex === (oSelf.length+1)) {
					oSelf.lastIndex = 0;
				}
				if (!oSelf.lastIndex) {
					oSelf.scrollTimer = setTimeout(anim, oSelf.chgUnitTime/2);
				}
				else{
					oSelf.scrollTimer = setTimeout(anim, oSelf.chgUnitTime);
				}
			}
			else {
				oSelf.scrollTimer = setTimeout(anim, oSelf.speed);
			}
		}
		else {
			if ((oSelf.itemWidth * oSelf.lastIndex) - oSelf.scrollValue <= 0) {
				oSelf.scrollValue = 0;
			}
			else {
				dist = Math.ceil(((oSelf.itemWidth * oSelf.lastIndex) - oSelf.scrollValue) / 10);
				oSelf.scrollValue += dist;
				oSelf.scrollWidth += dist;
			}
			oSelf.scrollArea.scrollLeft = oSelf.scrollValue;
			if (oSelf.scrollWidth % oSelf.itemWidth === 0) {
				oSelf.lastIndex += 1;
				if (oSelf.lastIndex === (oSelf.length+1)) {
					oSelf.lastIndex = 0;
				}
				if (!oSelf.lastIndex) {
					oSelf.scrollTimer = setTimeout(anim, oSelf.chgUnitTime/2);
				}
				else{
					oSelf.scrollTimer = setTimeout(anim, oSelf.chgUnitTime);
				}
			}
			else {
				oSelf.scrollTimer = setTimeout(anim, oSelf.speed);
			}
		}
	};
	anim();
};

var YScroll = function(){
	var i, len = arguments.length, news = [], timer = [];
	for (i = 0; i < len; ++i) {
		news[i] = new scrollNews(arguments[i]);
		timer[i] = setTimeout(function(index){
			return function(){
				if (timer[index]) {
					clearTimeout(timer[index]);
				}
				news[index].isPause = false;
			}
		}(i), news[i].pauseTime);
		
		news[i].scrollArea.onmouseover = function(index){
			return function(){
				news[index].isPause = true;
			}
		}(i);
		news[i].scrollArea.onmouseout = function(index){
			return function(){
				news[index].isPause = false;
			}
		}(i);
		news[i].play();
	}
	return news;
};
