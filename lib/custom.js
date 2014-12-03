$(function(){
	$("#first-image").load(function(){
		var image = $("#first-image");
		console.log(image.height());
		var aspectRatio = image.height() / image.width();
		$('#slides').slidesjs({
		    width: $(".content-wrapper").width(),
		    height: $(".content-wrapper").width() * aspectRatio,
		    play: {
		    	active:false,
		    	auto:true,
		    	interval:5000,
		    	restartdelay:5000,
		    	effect:"fade"
		    },
		    callback: {
		        loaded: function(){
		          // hide navigation and pagination
		          $('.slidesjs-pagination, .slidesjs-navigation').hide(0); 
		        }
		    }
		});

		$("#click-overlay").click(function(e){
			e.preventDefault;
			$(".slidesjs-next").click();
			$('#slides').slidesjs({
				play:{
					auto:true
				}
			});
		});
	});



});

