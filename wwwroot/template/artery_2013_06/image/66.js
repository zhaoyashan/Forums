jQuery(document).ready(function(){
	jQuery(".brands-list li a").hover(function(){
		jQuery(this).find(".shine").stop();
		jQuery(this).find(".shine").css("background-position","-160px 0"); 
		jQuery(this).find(".shine").animate({backgroundPosition: '160px 0'},500);
		jQuery(this).find(".title").stop().animate({left:'0px'},{queue:false,duration:450});
	},function(){
		jQuery(this).find(".title").stop().animate({left:'-160px'},{queue:false,duration:200});
	});
});