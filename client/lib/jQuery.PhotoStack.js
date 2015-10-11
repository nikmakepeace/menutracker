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
			$child.css("z-index", zIndex);
			zIndex++;
		});

		var rotateFlat = function ()  {
			$(this).rotate({rotate: {type: 'fixed', degree: 0, }});
		}
		var rotateWeird = function () {
			$(this).rotate({rotate: {type: 'random', degree: 20, }});	
		}
		var rotateBack = function () {
			$(this).rotate({rotate: {type: 'previous'}});	
		}


		$children.last().hover(
			rotateFlat,
			rotateBack
			);

		$this.click(function() {
			// console.log("starting click handling");
			var max = 0, $child;
			$children.each(function(){
				$thisChild = $(this);
				var current = parseInt($thisChild.css("z-index"));

				current++;
				$thisChild.css("z-index", current);
				if(current > max) {
					max = current;
					$child = $thisChild;
				}
			});

			
			$child
			.rotate({rotate: {type: 'previous'}})
			.animate({top: opt.top, left:opt.left}, opt.animationTime)
			.queue(function(next) {
				// console.log('Dropping z-index of ' + $child.attr('someAttr'));
				$child.css("z-index", 0);
				
				var max=0;
				$children.each(function() {
					$thisChild = $(this);
					var current = parseInt($thisChild.css("z-index"));
					// console.log('working with ' + $thisChild.attr('someAttr') + 'with z-index ' + current);
				
					current++;
					$thisChild.css("z-index", current);
				
					if(current > max){
						max = current;
						// console.log('Setting $child');
						$child = $thisChild;
					}

				});
				// console.log('Adding event handler to ' + $child.attr('someAttr'))
				$child.hover(
					rotateFlat,
					rotateBack
					);

				next();
			})
			.animate({top:0, left:0}, opt.animationTime);

			// console.log('turning off event handlers on ' + $child.attr('someAttr'));
			$child.off();
		});


	};
})(jQuery);

(function($) {
	var def = {
		transition: '0.8s',
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
	
	var getRotateAngle = function (matrix) {
		if(matrix !== 'none') {
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];
			var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		} else { 
			var angle = 0; 
		}
		return (angle < 0) ? angle + 360 : angle;
	}	

	var getVendorTransform = function () {
		return getPrefix() + 'transform';
	}
	
	var getVendorTransition = function () {
		return getPrefix() + 'transition';
	}

	$.fn.rotate = function(opt) {
		// console.log("starting rotating " + this.attr('someAttr'));
		// console.log(this.data());
		opt = $.extend(def, opt);
		var rotate = opt.rotate.degree;

		if(opt.rotate.type == 'fixed') {
			// console.log('rotating to exactly ' + rotate);
			this.animate({width: '150%', left: '-40px'})
		} else if(opt.rotate.type == 'random') {
			rotate = getRand((-1 * rotate), rotate);
			
			// console.log('rotating randomly to ' + rotate);
		} else if(opt.rotate.type == 'previous') {
			rotate = this.data('previousAngle');
			this.animate({width: '100%', left: '0px'})
			// console.log('rotating back to ' + rotate);
		}

		//	get existing rotation to store it for the 'previous' rotate type
		var currentAngle = this.data('currentAngle') || getRotateAngle(this.css('transform') || this.css(getVendorTransform()));
		this.data('previousAngle', currentAngle);
		// console.log("Setting previousAngle to " + currentAngle);
		
		var rotateExpr = "rotate(" + rotate + "deg)";
		
		this.css(getVendorTransition(), 'transform ' + opt.transition);
		this.css('transition', 'transform ' + opt.transition);
		this.css(getVendorTransform(), rotateExpr);
		this.css('transform', rotateExpr);

		currentAngle = rotate;//currentAngle = getRotateAngle(this.css('transform') || this.css(getVendorTransform()));
		this.data('currentAngle', currentAngle);
		// console.log("Setting currentAngle to " + currentAngle);

		// console.log(this.data());
		// console.log("done rotating");
		return this;
	}
})(jQuery);