var MEM = {};

/**
 * 
 * @param {String} selector - parent element
 * @param {Array} slides - html of different slides
 */
var SlideController = function(selector, slides) {
	this.numSlides = slides.length;
	this.currentlyVisible = 0;
	this.slides = slides;
	this.slideWidth = 400;
}

SlideController.prototype.render = function() {
	var html = $('#slides').apply({slides: this.slides});
	//for (var i = 0; i < this.numSlides; i++) {	
		//var html = "<div class='container' style='background-color:red;'>" + this.slides[i] + "</div>";
	$('#subInnerview').append(html);
	$('#subInnerview').css("width", this.slideWidth*this.numSlides + "px");
}

SlideController.prototype.initBindings = function() {
	$('#bMoveRight').bind('click', function() {
		slideShow.slideRight.apply(slideShow);
	});
  $('#bMoveLeft').bind('click', function() {
  	slideShow.slideLeft.apply(slideShow);
  });
}

SlideController.prototype.slideRight = function() {
	if(this.currentlyVisible >= this.numSlides*(-1) && this.currentlyVisible < 0) {
    ++this.currentlyVisible;
    var value = this.slideWidth*this.currentlyVisible;
    $('#subInnerview').css('-webkit-transform', 'translateX(' + value + 'px)');
    $("#subInnerview").bind("webkitTransitionEnd", function() {
    	$('.container').css('-webkit-transform','rotate(360deg)');
    });

    
	}
}

SlideController.prototype.slideLeft = function() {
	if(this.currentlyVisible  > (1 - this.numSlides) && this.currentlyVisible <= 0) {
   	--this.currentlyVisible;
   	var currentlyVisible = this.currentlyVisible;
    var value = this.slideWidth*this.currentlyVisible;
    $('#subInnerview').css('-webkit-transform', 'translateX(' + value + 'px)');
    $("#subInnerview").bind("webkitTransitionEnd", function() {
    	$('.container:eq(' + currentlyVisible + ')').css('-webkit-transform','rotate(360deg)');
    });
  }
}

$(document).ready(function() {
	var slideShow = new SlideController('#subInnerview', ['1', '2', '3', '4']);
	window.slideShow = slideShow;
	slideShow.render();
	slideShow.initBindings();
});