function Calendar() {};
Calendar.prototype.init = function(opts) {
	var now = new Date();
	var targetEl = document.getElementById(opts.id);

	var maskheight = window.innerHeight - 310;
	var fnHandler = opts.handler;
	var calTitle = null;

	var self = this;

	self.year = now.getFullYear();
	self.month = now.getMonth();
	self.date = now.getDate();
	self.el = targetEl;
	self.dateStr = self.getNowStr();

	targetEl.classList.add('box-calendar');
	var sHtml = '<div class="calendar-header">' +
		'<span class="btn-left">&lt;</span>' +
		'<span class="btn-right">&gt;</span>' +
		'<span class="title"></span>' +
		'</div>' +
		'<ul class="calendar-list"></ul>';
	targetEl.innerHTML = sHtml;

	var maskEl = document.createElement('div');
	maskEl.id = "mask";
	document.body.appendChild(maskEl);

	self.maskEl = document.getElementById("mask");
	self.maskEl.style.height = maskheight + 'px';

	calTitle = document.querySelectorAll(".calendar-header")[0].querySelector('.title');
	calTitle.innerHTML = self.getYearAndMonth();

	document.querySelectorAll(".btn-left")[0].addEventListener('click', function() {
		self.showPreMonth();
	});

	document.querySelectorAll(".btn-right")[0].addEventListener('click', function() {
		self.showNextMonth();
	});

	self.maskEl.addEventListener('click', function() {
		self.hideCal();
	});

	var list = document.querySelectorAll(".calendar-list");

	list[0].addEventListener('click', function(ev) {
		var myEl = ev.target;
		if(myEl.classList.contains('abled')) {
			var date = myEl.innerHTML;
			var year = self.year;
			var month = self.month + 1;

			if(month < 10) {
				month = '0' + month;
			}
			if(date < 10) {
				date = '0' + date;
			}

			var str = year + '-' + month + '-' + date;

			self.dateStr = str;
			self.hideCal();
			fnHandler && fnHandler(str);
		}
	});

	self.showList();
};
Calendar.prototype.show = function() {
	var arr = this.dateStr.split('-');
	this.year = arr[0];
	this.month = arr[1] - 1;
	this.showList();
	this.showCal();
};
Calendar.prototype.getNowStr = function() {
	var year = this.year;
	var month = this.month + 1;
	var date = this.date;
	if(month < 10) {
		month = '0' + month;
	}
	if(date < 10) {
		date = '0' + date;
	}
	return year + '-' + month + '-' + date;
};
Calendar.prototype.showCal = function() {
	this.maskEl.style.display = "block";
	this.el.style.display = "block";
};
Calendar.prototype.hideCal = function() {
	this.maskEl.style.display = "none";
	this.el.style.display = "none";
};
Calendar.prototype.showNextMonth = function() {
	this.month = this.month * 1 + 1;
	if(this.month == 12) {
		this.month = 0;
		this.year = this.year * 1 + 1;
	}
	this.showList();
};
Calendar.prototype.showPreMonth = function() {
	this.month = this.month - 1;
	if(this.month < 0) {
		this.month = 11;
		this.year = this.year - 1;
	}
	this.showList();
};
Calendar.prototype.getCurMonthDays = function() {
	var month = this.month * 1 + 1;
	var dateTemp = new Date(this.year, month, 0);
	return dateTemp.getDate();
};
Calendar.prototype.getPreMonthDays = function() {
	var month = this.month;
	var dateTemp = new Date();
	dateTemp.setMonth(month, 0);
	return dateTemp.getDate();
};
Calendar.prototype.getFirstDayOfMonth = function() {
	var dateTemp = new Date(this.year, this.month, 1);
	return dateTemp.getDay();
};
Calendar.prototype.getDayArr = function() {
	var aTemp = [],
		i;
	var pres = this.getPreMonthDays();
	var curs = this.getCurMonthDays();
	var firstDay = this.getFirstDayOfMonth();
	var start = pres - firstDay + 1;
	var end = 42 - firstDay - curs;
	for(i = start; i <= pres; i++) {
		aTemp.push({
			num: i,
			cls: 'disabled'
		});
	}
	for(i = 1; i <= curs; i++) {
		aTemp.push({
			num: i,
			cls: 'abled'
		});
	}
	for(i = 1; i <= end; i++) {
		aTemp.push({
			num: i,
			cls: 'disabled'
		});
	}
	return aTemp;
};
Calendar.prototype.showList = function() {
	document.querySelectorAll(".calendar-header")[0].querySelector('.title').innerHTML = this.getYearAndMonth();
	document.querySelectorAll(".calendar-list")[0].innerHTML = "";

	var arr = this.getDayArr();
	var sHtml = '<li class="title"><div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div></li>';
	for(var i = 0; i < arr.length; i = i + 7) {
		sHtml += '<li><div class="' + arr[i].cls + '">' + arr[i].num + '</div>' +
			'<div class="' + arr[i + 1].cls + '">' + arr[i + 1].num + '</div>' +
			'<div class="' + arr[i + 2].cls + '">' + arr[i + 2].num + '</div>' +
			'<div class="' + arr[i + 3].cls + '">' + arr[i + 3].num + '</div>' +
			'<div class="' + arr[i + 4].cls + '">' + arr[i + 4].num + '</div>' +
			'<div class="' + arr[i + 5].cls + '">' + arr[i + 5].num + '</div>' +
			'<div class="' + arr[i + 6].cls + '">' + arr[i + 6].num + '</div></li>';
	}
	document.querySelectorAll(".calendar-list")[0].innerHTML = sHtml;
};
Calendar.prototype.getYearAndMonth = function() {
	var month = this.month + 1;
	if(month < 10) {
		month = '0' + month;
	}
	return this.year + '年' + month + '月';
};