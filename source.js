$(document).ready(function(){
	
	var count = 0;
  $('#bMoveRight').click(function() {
      
   	if(count >=-4 && count < 0) {
      	++count;
      var value = 450*count;
      $('.container').css('-webkit-transform', 'translateX(' + value + 'px)');
      var position = document.getElementsByTagName('container').position;
      console.log(position);
      console.log(count);
  }
  });
    
  });