// Painting: Scratches series, Colour Field Series, Figurative Series
// Illustration is general
// Photography: Austria, Paris, Germany, London, Switzerland(?) Amsterdam, Nature and Urban
// Sculpture : Modern and Concept


var folders = [	
"portrait",		
"scratches",
"amsterdam",
"illustration",
"colorField",		
"concept",
"austria",
"paris",
"figurative",
"nature",			
"modern",
"london"
];

var galleryNumbers =[
7,
5,
4,
4,
5,
4,
6,
3,
4,
9,
4,
5
]


$(function(){
	setup();
	makeSubsectionGallery();
	checkEvents();

	var $window = $(window);
    var width = $window.width();
    var height = $window.height();

    setInterval(function () {
        if ((width != $window.width()) || (height != $window.height())) {
            width = $window.width();
            height = $window.height();
            $(window).trigger('resize');
        }
    }, 1000);

	$(window).resize(function(){
		makeSubsectionGallery();
		$("#contact").height($(window).width()*.4);
		setTimeout(function(){
			centerImages(),1000	
		});		
	});

});


//Sets up the initial slideshow and overlay
function setup(){
	$("#first-image").load(function(){
		var image = $("#first-image");
		var aspectRatio = image.height() / image.width();
		$('#slides').slidesjs({
			width: $("#wrapper-content").width(),
			height: $("#wrapper-content").width() * aspectRatio,
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

		hideAll();
		$("#slides").fadeIn();
		$("#click-overlay").show();
		
	});
}

//Takes list of photos and generates subsection gallery with those highlighted
function subsections(chosenSections){
	hideAll();
	var i = 0;
	$("#subsectionGallery").children().each(function(){
		if($.inArray(i,chosenSections) !== -1){
			$(this).children('img').fadeTo(200,1);
		}
		i++;
	});
	$("#subsection").fadeIn(500);
}

//Hides all windows
function hideAll(){
	$("#click-overlay").hide();
	$("#slides").hide();
	$("#subsection").hide();
	$("#contact").hide();
	$("#bio").hide();
	$("#gallery").remove();
	$("#wrapper-content").append("<div id='gallery'></div>")
	$("#subsectionGallery").children().each(function(){
		$(this).children('img').fadeTo(1,.15);
	});
}

//Forms subsection gallery
function makeSubsectionGallery(){
	$("#subsectionGallery").justifiedGallery({
		sizeRangeSuffixes : {
			lt100 : '_t', 
			lt240 : '_t', 
			lt320 : '_t', 
			lt500 : '_t', 
			lt640 : '_t', 
			lt1024 : '_t'
		},
		rowHeight:$("#wrapper-content").width()*.15,
		imagesAnimationDuration:0
	});
}

//Handle all mouse events
function checkEvents(){
	$("#click-overlay").click(function(e){
		e.preventDefault;
		$(".slidesjs-next").click();
		$('#slides').slidesjs({
			play:{
				auto:true
			}
		});
	});

	$("#link-painting").click(function(){
		subsections([1,4,8]);
	});

	$("#link-illustration").click(function(){
		subsections([3]);
	});

	$("#link-photography").click(function(){
		subsections([0,2,6,7,9,11]);
	});

	$("#link-sculpture").click(function(){
		subsections([5,10]);
	});

	$("#link-contact").click(function(){
		hideAll();
		$("#contact").fadeIn(500);
		$("#contact").height($(window).width()*.4);
	});

	$("#link-bio").click(function(){
		hideAll();
		$("#bio").fadeIn(500);
	});

	$("#subsectionGallery").children().hover(
		function(){
			$(this).children('div').stop().fadeTo(200,1);
		}
		,
		function(){
			$(this).children('div').stop().fadeTo(200,0);
		}
		);

	$("#subsectionGallery").children().click(function(){
		var folderName = folders[$(this).index()];
		var numberImages = galleryNumbers[$(this).index()]
		hideAll();
		for(i=1 ; i<=numberImages ; i++){
			var image = $("<img src='img/galleries/" + folderName + "/" + i + ".jpg'>");
			$("#gallery").append(image);
		}

		$("#gallery").show();


		var aspectRatio = .65;

		$('#gallery').slidesjs({
			width: $("#wrapper-content").width(),
			height: $("#wrapper-content").width() * aspectRatio,
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
		

		$(".slidesjs-control").children().load(function(){
			if( $(this).height() > $(this).width() * .65 ) {
				$(this).addClass('resizedImage');
				centerImages();
			}
		});
		$("#click-overlay").show();
		$("#click-overlay").height($("#gallery").height());
	});


}

function centerImages(){
	$(".slidesjs-control").children().each(function(){
		var moveLeft = ($("#wrapper-content").width() - $(this).width())/2 ;
		if(moveLeft > 0){
			$(this).css('margin-left',moveLeft);
		}
	});
}