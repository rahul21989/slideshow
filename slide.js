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
  $('.container').bind('webkitTransitionEnd', function(e){
  	e.preventDefault();
  	return false;
  });
  $("#subInnerview").bind("webkitTransitionEnd", function(e) {
  	var current = slideShow.currentlyVisible*(-1);
  	if(current >= 0) {
  		var $currentElem = $('.container').eq(current);
  		$currentElem.css('-webkit-transform','rotate(360deg)');
  		$('.container').not($currentElem).css('-webkit-transform','rotate(0deg)')
  	}
  });
}

SlideController.prototype.slideRight = function() {
	if(this.currentlyVisible >= this.numSlides*(-1) && this.currentlyVisible < 0) {
    ++this.currentlyVisible;
    var value = this.slideWidth*this.currentlyVisible;
    $('#subInnerview').css('-webkit-transform', 'translateX(' + value + 'px)');
	}
}

SlideController.prototype.slideLeft = function() {
	if(this.currentlyVisible  > (1 - this.numSlides) && this.currentlyVisible <= 0) {
   	--this.currentlyVisible;
    var value = this.slideWidth*this.currentlyVisible;
    $('#subInnerview').css('-webkit-transform', 'translateX(' + value + 'px)');
    
  }
}

$(document).ready(function() {
	var slideShow = new SlideController('#subInnerview', ['1', '2', '3', '4']);
	window.slideShow = slideShow;
	slideShow.render();
	slideShow.initBindings();
});