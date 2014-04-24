var Question = {};

Question.getHtml = function() {
	var a = Math.floor(Math.random()*100);
	var b = Math.floor(Math.random()*100);
	var result =  a + b;
	var arr = [result, result - 3, result + 2, result * 2];
	
	var shuffledArray  =  shuffle(arr);
	
  Question.result = result;
	var html = $('#tpl-addition').apply({
		operator: "+",
		numbers:[a,b],
		choices:shuffledArray
	});
	return html;
}

Question.getChoicesPosition = function() {
	var choicesAnimation = [0,1,2,3];
	choicesAnimation = shuffle(choicesAnimation);
	return choicesAnimation;
}

Question.initBinding = function(correctCallback) {
	$('.option').bind('click', function() {
		var answer = $(this).text();
		if(answer == Question.result) {
			alert("Right Answer");
			correctCallback();
		} else {
			alert("Sorry!!Wrong Answer.please try again");
		}
	});
}

function shuffle(arr) {
  var i = arr.length, j, temp;
  if ( i === 0 ) 
  	return false;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = arr[i];
     arr[i] = arr[j]; 
     arr[j] = temp;
   }
	return arr;
}