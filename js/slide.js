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
  questionBinding();
}

function questionBinding() {
  Question.initBinding(correctCallback);
}

function correctCallback() {
  slideShow.replaceHtml(Question.getHtml());
  $('.number1').css('-webkit-transform','rotate(360deg)');
  shuffleAnimation();
  questionBinding();
}


function shuffleAnimation() {
  var shuffledPositions = Question.getChoicesPosition();
  for(var i = 0 ; i < shuffledPositions.length; i++) {
    var diff = $('.option').eq(shuffledPositions[i]).offset().left - $('.option').eq(i).offset().left ;
    $('.option').eq(i).css('-webkit-transform', 'translateX(' + diff + 'px)');
  }
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

function createFirstPage() {
  var html = $('#content_page').apply({});
  return html;
}


function createFirstPage1() {
  var html = $('#content_page1').apply({});
  return html;
}

$(document).ready(function() {
  var table = new TabularForm([["Task", "Status"],["learning JS", "Completed"],
    ["learning Jquery", "Completed"],["learning Templates", "Completed"],["Object Oriented JS", "Completed"],["learning CSS3", "Completed"],["Sample Question", "Completed"]]);
	var tableContent = table.render();
  var slideShow = new SlideController('#subInnerview', [createFirstPage(), tableContent, Question.getHtml(), createFirstPage1()]);
	window.slideShow = slideShow;
	slideShow.render();
	$('#addition-cont').css("opacity", 1);
  slideShow.initBindings();
});


SlideController.prototype.replaceHtml = function(content) {
  var $slide = $('.slide-' + (-1)*this.currentlyVisible);
  var $addCont = $('#addition-cont');
  $addCont.fadeOut();
  $addCont.remove();
  $slide.html(content);
  $('#addition-cont').css("opacity", 1);
}
