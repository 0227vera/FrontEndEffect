//页面id的获取
var obox = document.getElementById('box');
var oscroll = document.getElementById('scroll');
var opoint_btns = document.getElementById('point_btns').getElementsByTagName('a');
var oprev = document.getElementById('prev');
var onext = document.getElementById('next');

//初始值
obox.index = 0;
//方向
obox.direction = 1;
//一次性计时器
function automove() {
	obox.timer ? clearTimeout(obox.timer) : null;
	obox.timer = setTimeout(omove, 1000);
}
//函数的调用
automove();

function omove() {
	obox.index += obox.direction;
	//	正向和反向轮播的终结点转换
	if (obox.index == 6) {
		obox.index = 1;
		oscroll.style.left = 0;
	} else if (obox.index == -1) {
		oscroll.style.left = '-4800px';
		obox.index = 4;
	}
	//animate函数的调用
	animate(oscroll, {
		'left': -obox.index * 960
	}, 300, function () {
		automove();
	});
	//高光灯的跟随
	for (var i = 0; i < opoint_btns.length; i++) {
		opoint_btns[i].className = '';
	}
	opoint_btns[obox.index % 5].className = 'high_light';
}
//两个点击按钮的时间
oprev.onclick = function () {
	clearTimeout(obox.timer);
	obox.direction = -1;
	omove();
}
onext.onclick = function () {
	clearTimeout(obox.timer);
	obox.direction = 1;
	omove();
}
obox.onmouseover = function () {
	oprev.className = "show";
	onext.className = "show";
	this.onmouseout = function () {
		oprev.className = "hide";
		onext.className = "hide";
		automove();
	}
}
//跟随灯的点击事件
for (var i = 0; i < opoint_btns.length; i++) {
	opoint_btns[i].index = i;
	opoint_btns[i].onclick = function () {
		obox.index = this.index;
		animate(oscroll, {
			'left': -obox.index * 960
		}, 300, function () {
			automove();
		});
		for (var j = 0; j < opoint_btns.length; j++) {
			opoint_btns[j].className = '';
		}
		this.className = 'high_light';
	}

}
