var memberShow = function(val){
	var mem_div = jQuery("."+val);
	var memli = mem_div.find("li.memLI");
	var mem_len = memli.length;
	var pop_info = mem_div.find(".popInfo");
	var layer_Mode = mem_div.find(".layerMode");
	var thumb1 = [];//缓存数组
	var thumb2 = [];//缓存数组
	var init_left,init_top;
	var hovertime;
	
	/*图片位置随机显示*/
	function imgRand(){
		//随机生成条目，加载随机的样式，插入dom里面，先隐藏
		for(var i = 0; i<mem_len; i++){
			thumb1[i] = i;
			thumb2[i] = i;
		}
		
		var thumb1_len = thumb1.length;
		var thumb2_len = thumb2.length;

		var index = 0;
		(function(){
			if(index >= mem_len){
				return;
			}
			var s_index = parseInt(Math.random()*thumb2_len);	//显示随机数
			memli.eq(thumb2[s_index]).css('visibility','visible');
			thumb2.splice(s_index,1);
			thumb2_len--;
			index++;
			window.setTimeout(arguments.callee,50);
		})();
	}
	
	imgRand();
	
	memli.bind({
		mouseover : function(){
			THIS = jQuery(this);
			hovertime = setTimeout(function(){
				pop_info.css({"display":"block"});
				var addinfo = THIS.find(".addInfo").html();
				pop_info.html(addinfo);
				var position = THIS.position();
				var new_left,new_top;
				var cssShadow;
				var _margin;
				
				if(position.left <= mem_div.width() - pop_info.width()){
					new_left = position.left -2;
					cssShadow = "imgShadow1";
					_margin = "left";
					pop_info.find("img").css("float","left");
					pop_info.find("p").css({"float":"left","margin-left":"-50px"});
				}
				if(position.left > mem_div.width() - pop_info.width()){
					new_left = position.left - THIS.width()*3 -5;
					cssShadow = "imgShadow2";
					_margin = "right";
					pop_info.find("img").css("float","right");
					pop_info.find("p").css({"float":"right","margin-right":"-50px","text-align":"right"});
				}
				if(position.top <= mem_div.height() - pop_info.height()){
					new_top = position.top - 2;
				}
				if(position.top > mem_div.height() - pop_info.height()){
					new_top = position.top - THIS.height()*2 - 4;	
				}
				
				pop_info.css({"top":new_top,"left":new_left});
				pop_info.find("img").addClass(cssShadow);
				if(_margin == "left"){
					pop_info.find("p").animate({			   
						marginLeft: "0px"					   
					},
					300
					);	
				}
				else if(_margin == "right"){
					pop_info.find("p").animate({			   
						marginRight: "0px"
					},
					300
					);		
				}
				layer_Mode.fadeTo("slow", 0.4);
			},300);
		},
		mouseout: function(){
			clearTimeout(hovertime);
		}
		
	})
	
	pop_info.bind('mouseout',function(){
		layer_Mode.css({"display":"none"});
		pop_info.css({"display":"none","top":0,"left":0});
		pop_info.html("");
	})
}


jQuery(document).ready(function(){
	memberShow("memberShow");
})