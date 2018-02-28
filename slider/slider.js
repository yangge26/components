var slider = {
	init: function(obj) {
		var len = obj.imgArr.length;
		var imgs = obj.imgArr.slice();

		imgs.unshift(arr[len - 1]);
		imgs.push(arr[0]);
		this.cur = 1;
		this.width = obj.width;

		if(!this.width) {
			this.width = 450;
			this.height = 240;
		}

		var str = '';

		for(var i = 0; i < imgs.length; i++) {
			var styleStr = this.getCssText({
				"width": "100%",
				"height": "100%"
			});
			str += '<div style="' + styleStr + '"><img src="' + imgs[i] + '" width="100%" height="100%" /></div>';
		}

		obj.el.innerHTML = '<div class="list">' + str + '</div>';

		obj.el.style.cssText = this.getCssText({
			"width": this.width + 'px',
			"height": this.height + 'px',
			"overflow": 'hidden'
		});

		this.list = obj.el.querySelector('.list');

		this.list.style.cssText = this.getCssText({
			"display": "-webkit-box",
			"transition-duration": "300ms",
			"transition-timing-function": "ease-in-out",
			"transform": "translateX(-100%)"
		});

		this.list.addEventListener('webkitTransitionEnd', () => {
			this.removeDuration();
			if(this.cur === 0) {
				this.cur = len;
			}
			if(this.cur === len * 1 + 1) {
				this.cur = 1;
			}
			this.move();
			this.addDuration();
		});

	},
	moveLeft: function() {
		this.cur++;
		this.move();
	},
	moveRight: function() {
		this.cur--;
		this.move();
	},
	move: function() {
		var move = -this.width * this.cur;
		this.list.style.transform = 'translateX(' + move + 'px)';
	},
	addDuration: function() {
		setTimeout(() => {
			this.list.style.transitionDuration = '300ms';
		}, 0);
	},
	removeDuration: function() {
		this.list.style.transitionDuration = '0ms';
	},
	getCssText: function(obj) {
		var str = "";
		for(var k in obj) {
			str += k + ":" + obj[k] + ";";
		}
		return str;
	}
};