var eBox = document.getElementById('box');
		var eBtn = document.getElementById('btn');
		var eBtn1 = document.getElementById('btn1');
		var eBtn2 = document.getElementById('btn2');
		var eFs = document.getElementById('fenshu');
		var eGs = document.getElementById('guanshu');
		var eWffj = document.getElementById('wffj');
		var eFengji = document.getElementById('fengji');
		var eFs1 = document.getElementById('fenshu1');
		var eGs1 = document.getElementById('guanshu1');
		var eSm = document.getElementById('shengming');
		var eSm1 = document.getElementById('shengming1');
		var eH1 = document.getElementById('H1');

		
		

		eBtn.onclick=function(){//开始游戏
			eBtn.style.display = "none";
			eBtn1.style.display = "block";
			eBtn2.style.display = "block";
			eFs.style.display = "block";
			eGs.style.display = "block";
			eWffj.style.display = "block";
			eFengji.style.display = "none";
			eSm.style.display = "block";


			//背景音乐
			var eAbj = document.createElement("audio");
			eAbj.setAttribute("src","audio/bjyy.mp4");
			eBox.appendChild(eAbj).play();
			var timer6 = setInterval(function fnbjyy(){
				var eAbj = document.createElement("audio");
				eAbj.setAttribute("src","audio/bjyy.mp4");
				eBox.appendChild(eAbj).play();
			},21000);
			
			
			
			var num=0;//子弹次数
			var num2=0;//敌方次数
			var num3=0;//分数
			var num4=1;//关数
			var num5=1;
			var num7=3;

			
			
			eWffj.onclick = function fn(){//点击我方飞机
				
				if(num==0){//我方飞机子弹
					var timer = setInterval(function(){//子弹射击
						var eZd = document.createElement("div");
						eZd.className = "active";
						eBox.appendChild(eZd);
						//判断我方飞机的位置
						var x1 = eWffj.offsetLeft;
						var y1 = eWffj.offsetTop;

						var xeWffj = eWffj.offsetWidth;
						eZd.style.left=x1+1/2*xeWffj+"px";
						eZd.style.top=(y1-10)+"px";

						move({
							ele:eZd,
							props:{
								top:-10,//子弹的路程
								left:x1+1/2*xeWffj
							},
							delay:10,
							duration:1000
						})

						//子弹声音
						var eAd = document.createElement("audio");
						eAd.setAttribute("src","audio/zd.wav");
						eZd.appendChild(eAd).play();

								
						//判断子弹是否飞出屏幕
						var timer1 = setInterval(function(){
							if (eZd.offsetTop < 0) {
								eBox.removeChild(eZd);
							}
						},200);
					},150);
				}
				num++;
				eWffj.onclick = null;


				//敌方飞机
				var timer2 = setInterval(function(){
					num2++;
					var eDj = document.createElement("a");
					if (num2%10 == 0) {
						eDj.className = "activeD";
						eDj.num6=5;
					}else if(num2%5 == 0){
						eDj.className = "activeZ";
						eDj.num6=3;
					}else{
						eDj.className = "activeX";
						eDj.num6=1;
					}
					eBox.appendChild(eDj);

					

				//判断子弹与敌机碰撞
				eDj.timer9 = setInterval(function(){
					var zd = eBox.querySelectorAll(".active");
					for(var i=0; i<zd.length; i++){
						if(boom(eDj, zd[i])){
							eDj.num6--;
							eBox.removeChild(zd[i]);
							if(eDj.num6 <= 0){
								clearInterval(eDj.timer9);
								eBox.removeChild(eDj);
								eFs1.innerHTML = parseInt(eFs1.innerHTML)+10;
								if(eFs1.innerHTML == 1000*num4*num4){
									num4++;
									eGs1.innerHTML = num4;
								}
							}
						}
					}
				},10);
					
				//判我方飞机与敌机碰撞
				eWffj.timer10 = setInterval(function(){
					var wfj = document.getElementById('wffj');
					if(shaka(eDj, wfj)){
						num7 --;
						eSm1.innerHTML = num7;
						eBox.removeChild(eDj);
						if (num7 == 0) {
							eSm1.className = "shengming2";
							eSm1.innerHTML = "您已阵亡!";
							wfj.style.display = "none";
							clearInterval(timer);
							clearInterval(timer2);
							eH1.style.display = "block";
						}	
					}
					
				},500);

				var xxx = Math.random()*(eBox.offsetWidth - eDj.offsetWidth);
				eDj.style.top = -200 + "px";
				eDj.style.left = xxx + "px";

				move({
						ele:eDj,
						props:{
							top:600,//敌方飞机的运动路程
							left:Math.random()*(eBox.offsetWidth - eDj.offsetWidth)
							/*当left为 xxx 时 敌方飞机竖直落下
							  当left 为原数值时，飞机竖直落下
							*/
						},
						delay:5,
						duration:5000/num4//增加游戏难度的关键  敌军下落的速度 数字越小速度越快
					})
				var timer3 = setInterval(function(){
					if (eDj.offsetTop > 550) {
						eBox.removeChild(eDj);
					}
				},10);
			},400);



				eBox.onmousemove = function(e){//我方飞机移动
					e = e ||　window.event;
					var x = e.clientX-eBox.offsetLeft-eWffj.offsetWidth/2;
					var y = e.clientY-eBox.offsetTop-eWffj.offsetHeight/2;
					if (x<0) {
						x=0;
					}else if(x>eBox.clientWidth-eWffj.clientWidth){
						x=eBox.clientWidth-eWffj.clientWidth;
					}
					if (y<0) {
						y=0;
					}else if(y>eBox.clientHeight-eWffj.clientHeight-50){
						y=eBox.clientHeight-eWffj.clientHeight-50;
					}
					eWffj.style.left = x + "px";
					eWffj.style.top = y + "px";
					
				}
				



				eBtn2.onclick= function(){//重新开始
					eWffj.style.left = "";
					eWffj.style.top = "";
					eWffj.style.display = "block";
					eBox.onmousemove = null;
					clearInterval(timer);
					clearInterval(timer2);
					clearInterval(timer6);
					eWffj.onclick =function(){
						num = 0;
						fn();
						eBox.appendChild(eAbj).play();
					};
					num3 = 0;
					num4 = 1;
					num7 = 3;
					eFs1.innerHTML = num3;
					eGs1.innerHTML = num4;
					eSm1.className = "";
					eSm1.innerHTML = num7;
					var eedj = document.getElementsByTagName("a");
					var qcdj = eedj.length;//清除敌机
					for(var i = 0;i<qcdj;i++){
						eBox.removeChild(eedj[0]);
					}
					eH1.style.display = "none";
				};

				eBtn1.onclick = function(){//退出本关
					eBtn.style.display = "block";
					eBtn1.style.display = "none";
					eBtn2.style.display = "none";
					eFs.style.display = "none";
					eGs.style.display = "none";
					eWffj.style.display = "none";
					eFengji.style.display = "block";
					eSm.style.display = "none";
					eH1.style.display = "none";
					clearInterval(timer);
					clearInterval(timer2);
					clearInterval(timer2.timer9);
					clearInterval(timer2.timer10);
					num3 = 0;
					num4 = 1;
					num7 = 3;
					eFs1.innerHTML = 0;
					eGs1.innerHTML = num4;
					eSm1.className = "";
					eSm1.innerHTML = num7;
					eBox.onmousemove = null;
					eWffj.style.left = "";
					eWffj.style.top = "";
					clearInterval(timer6);
					eBox.removeChild(eAbj);
					var eedj = document.getElementsByTagName("a");
					var qcdj = eedj.length;//清除敌机
					for(var i = 0;i<qcdj;i++){
						eBox.removeChild(eedj[0]);
					}
				}
			}
			eBtn1.onclick = function(){//退出本关
				eBtn.style.display = "block";
				eBtn1.style.display = "none";
				eBtn2.style.display = "none";
				eFs.style.display = "none";
				eGs.style.display = "none";
				eWffj.style.display = "none";
				eFengji.style.display = "block";
				eSm.style.display = "none";
				eH1.style.display = "none";
				boom = null;
				shaka = null;
			}

			/*//跑分程序
			function fnfenshu(){
				num3 = num3 + 10;
				eFs1.innerHTML = num3; 
				if (num3 == 100*num5*num5) {
					num4++;
					num5++;
					eGs1.innerHTML = num4;
					if (num4 == 10) {
						eGs1.innerHTML = num4;
						clearInterval(timer);
						clearInterval(timer2);
						}
					}
				}		
			*/


		//判断子弹与敌方飞机碰撞函数
		function boom(dj, zd){
			if((dj.offsetLeft < zd.offsetLeft+zd.offsetWidth && dj.offsetLeft+dj.offsetWidth > zd.offsetLeft) && (dj.offsetTop < zd.offsetTop+zd.offsetHeight && dj.offsetTop+dj.offsetHeight > zd.offsetTop)){
				return true;
			}else{
				return false;
			}
		}
		//判断我方飞机与敌方飞机碰撞函数
		function shaka(dj, wj){
			if((dj.offsetLeft < wj.offsetLeft+wj.offsetWidth && dj.offsetLeft+dj.offsetWidth > wj.offsetLeft) && (dj.offsetTop < wj.offsetTop+wj.offsetHeight && dj.offsetTop+dj.offsetHeight > wj.offsetTop)){
				return true;
			}else{
				return false;
			}
		}

			}
