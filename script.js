window.onload=function(){

$.ajaxSetup({ async: false });

var vokalid = [];
$.get('audio/vocals.txt', function(txtFile){
  vokalid = txtFile.split("\n");
});
console.log(vokalid);

// var vokalid = ["a", "e", "i", "o", "u", "y", "æ", "ø", "å"];

var vokalnr = Math.floor(Math.random() * vokalid.length);
var correct = 0;
var wrong = 0;
var answered = [];
var correctisanswered = 0;
var percent = 0;

function vocalButton (p1){
  $("#" + vokalid[p1]).on("click", function(){
	if (vokalnr == p1 && $.inArray(vokalid[p1], answered) == -1) {
		$("#" + vokalid[p1]).removeClass("wrong").addClass("correct");
		correct = correct + 1;
		$("#correct").html(correct);
		answered.push(vokalid[p1]);
		correctisanswered = 1;
	}else if($.inArray(vokalid[p1], answered) == 0){
	}else if($.inArray(vokalid[p1], answered) == -1){
		$("#" + vokalid[p1]).removeClass("correct").addClass("wrong");
		wrong = wrong + 1;
		$("#wrong").html(wrong);
		answered.push(vokalid[p1]);
  }
})
}


$("#play").on("click", function(){
  $("#" + vokalid[vokalnr] + "-audio").trigger("play")
})

$("#next").on("click", function(){
  if (correctisanswered == 1){
	vokalnr = Math.floor(Math.random() * vokalid.length);
	$('#' + vokalid[vokalnr] + "-audio").trigger("play")
	$("*").removeClass("wrong").removeClass("correct");
	answered.length = 0
	correctisanswered = 0;
	if (wrong == 0) {
		$("#percent").html("100");
	}else {
		percent = correct / ( correct + wrong ) * 100;
		$("#percent").html(percent.toFixed(0));
	}
  }
})

var y = "";
for (i = 0; i < vokalid.length; i++) {
  y = y + '<grid><button id="' + vokalid[i] + '">' + vokalid[i] + '</button></grid>'
  }
document.getElementById("button-grid").innerHTML = y;

for (i = 0; i < vokalid.length; i++) {
    vocalButton(i);
}

var x = "";
for (i = 0; i < vokalid.length; i++) {
	x = x + '<audio class="audios" id="' + vokalid[i] + '-audio" controls preload="none"><source src="audio/' + vokalid[i] + '.mp3" type="audio/mpeg"></audio>'
	}
document.getElementById("audio").innerHTML = x;

}
