//定人名
var partners = ['四爷', '龙哥', '慧明', '阿黎', '大辛', '欣宇', '航宇', '硕', '凯健', '南哥', '立', '', '二成', '小白', '小志', '雪峰', '英威', '潇', '鲍瑞'];
//招式
var pain = ['干拔跳投命中', '交叉过了他上篮得分', '三分尬投', '背身单打得手', '过马路一样过了', '给上一记火锅', 'crossover戏耍', '欧洲尬步', '澳大利亚炮', '意大利迫击炮','试探尬踩'];
//获取人名
var partner1 = document.getElementById('partner1');
var partner2 = document.getElementById('partner2');
//随机抽取两人
function getimformation() {
	var i = 0;
	var p1, p2;
	while (i < partners.length) {
		p1 = partners[Math.floor(Math.random() * partners.length)];
		p2 = partners[Math.floor(Math.random() * partners.length)];
		if (p1 !== p2) {
			break;
		}
	}

	return [{
		partner: p1,
		blood: 360,
		cName: 'p0'
	}, {
		partner: p2,
		blood: 360,
		cName: 'p0'
	}]
}
var imformation = getimformation();

//写入人名
function writeIn() {
	partner1.innerHTML = imformation[0].partner;
	partner2.innerHTML = imformation[1].partner;
}

//获取能力值
var blood1 = document.getElementById('blood1');
var blood2 = document.getElementById('blood2');
var bloods = [blood1, blood2];
//获取显示区
var start = document.getElementById('show');
//开始按钮
var gogogo = document.getElementsByTagName('button');
gogogo[0].onclick = function () {
	writeIn();
	start.innerHTML = "";
	var timer = setInterval(function () {
		var n = Math.floor(Math.random() * 2);
		var h = pain[Math.floor(Math.random() * pain.length)];
		var hn = Math.floor(Math.random() * 50 + 6);
		/*伤害显示*/
		start.innerHTML += '<p><b class="p' + n + '">' + imformation[n].partner + '</b>对<b class="p' + Number(!n) + '">' + imformation[Number(!n)].partner + '</b>' + h + '，对其造成了<b>' + hn + '</b>点伤害</p>';
		imformation[Number(!n)].blood -= hn;
		/*获胜判定*/
		if (imformation[Number(!n)].blood <= 0) {
			imformation[Number(!n)].blood = 0;
			start.innerHTML += '<p><b class="p' + n + '">' + imformation[n].partner + '</b>&nbsp;<i>K.O</i>&nbsp;<b class="p' + Number(!n) + '">' + imformation[Number(!n)].partner + '</b>'
			gameOver(imformation[n].partner, n);
		}
		bloods[Number(!n)].style.width = imformation[Number(!n)].blood + 'px';
		/*滚动条置底*/
		start.scrollTop = start.scrollHeight;
	}, 500)
	/*游戏结束*/
	function gameOver(str, x) {
		clearInterval(timer);
		var dialog = document.getElementById("dialog");
		console.log(dialog)
		dialog.innerHTML = '<b><i>Winner!!!</i>&nbsp;&nbsp;&nbsp;' + str + '</b>';
		dialog.className = 'winner';

	}
}
