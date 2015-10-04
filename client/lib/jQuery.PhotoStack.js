/**
* jquery.Photostack.js v0.2.0 - Simple Photostack plugin for jQuery
* derived from https://github.com/steelydylan/jquery.Photostack.js
* MIT Licensed
* Copyright (C) 2015 steelydylan http://horicdesign.com & nikmakepeace
*/
(function($){
	var getRand = function (a, b) {
        return ~~(Math.random() * (b - a + 1)) + a;
    }
    var getPrefix = function(){
    	var userAgent = window.navigator.userAgent.toLowerCase();
    	if(userAgent.indexOf("msie")){
    		return "-ms-";
    	}else if(userAgent.indexOf("chrome") || userAgent.indexOf("safari")){
    		return "-webkit-"
    	}else if(userAgent.indexOf("firefox")){
    		return "-moz-";
    	}else if(userAgent.indexOf("opera")){
    		return "-o-";
    	}else{
    		return "";
    	}
    }
    var def = {
    	top: 40,
    	left: 500,
    	animationTime: 100
    }

	$.fn.Photostack = function(opt){
		opt = $.extend(def,opt);
		var $this = $(this);
		var $children = $this.children();
		var zIndex = 0;
		$this.addClass("js-photostack");
		$children.each(function(){
			var $child = $(this);
			$child.rotate();
			$child.css("z-index",zIndex);
			zIndex++;
		});

		$this.click(function() {
			var max = 0, $child;
			$children.each(function(){
				var $thisChild = $(this);
				var current = parseInt($thisChild.css("z-index"));

				current++;
				$thisChild.css("z-index", current);
				var newCurrent = parseInt($thisChild.css("z-index"));
				if(current > max){
					max = current;
					$child = $thisChild;
				}
			});
			
			$child
			.rotate({transition: opt.animationTime + 'ms'})
			.animate({top: opt.top, left:opt.left}, opt.animationTime)
			.queue(function(next){
				$child.css("z-index",0);
				next();
			})
			.animate({top:'20px', left:0}, opt.animationTime);
		});
	};
})(jQuery);

(function($) {
	var def = {
		transition: '0.5s',
		rotate: { type: 'random', degree: 20 }
	};

	var getRand = function (a, b) {
        return ~~(Math.random() * (b - a + 1)) + a;
    }

    var getPrefix = function(){
    	var userAgent = window.navigator.userAgent.toLowerCase();
    	if(userAgent.indexOf("msie")){
    		return "-ms-";
    	}else if(userAgent.indexOf("chrome") || userAgent.indexOf("safari")){
    		return "-webkit-"
    	}else if(userAgent.indexOf("firefox")){
    		return "-moz-";
    	}else if(userAgent.indexOf("opera")){
    		return "-o-";
    	}else{
    		return "";
    	}
    }

	$.fn.rotate = function(opt) {
		opt = $.extend(def, opt);

		var rotate = opt.rotate.degree;
		if(opt.rotate.type == 'random') {
			rotate = getRand((-1 * rotate), rotate);
		}

		var rotate = "rotate(" + rotate + "deg)";
		var prefix = getPrefix();
		this.css('transition', 'transform ' + opt.transition);
		this.css(prefix + "transform", rotate);
		this.css("transform", rotate);

		return this;
;	}
})(jQuery);