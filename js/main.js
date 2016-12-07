'use strict';

(function() {

console.log('Hello Meme');

var GMEMES_SIZE = 8;
var GLINES_SIZE = 2;
var LINE1 = 0;
var LINE2 = 1;

var gMemes=[];
var gRating;
var gLines=[];

$(document).ready(function(){
    var meme = {id:0, url:'', keyWords:[], rating:0};
   for (var i = 0; i < GMEMES_SIZE; i++) {
        meme = {id:i+1, url:'../assets/img'+(i+1)+'.jpg', keyWords:[], rating:0};
        gMemes.push(meme);
    };

    var line = {posX:40, posY:30, color:'#000000', font:'Segoe UI', fontSize:20, text:'text1 text1'};
    gLines.push(line);
    line = {posX:40, posY:270, color:'#000000', font:'Segoe UI', fontSize:20, text:'textA textB'};     
    gLines.push(line);

    doEditor(gMemes[1].url);
});

// function called when user click on image.
// need to enter editor mode with that image.
function doEditor(imgUrl){
        // memeCanvas
    var canvas = document.querySelector('#memeCanvas');
    var ctx = canvas.getContext('2d');
    drawOnCanvas(imgUrl, ctx);
}

function drawOnCanvas(imgUrl,ctx) {
    var img = new Image();
 //   img.src = "assest/img1.jpg";
    img.src = imgUrl;

    img.onload = function () {

        ctx.drawImage(img, 0, 0, 400, 300);
        for (var i = 0; i < GLINES_SIZE; i++) {
            ctx.font = gLines[i].fontSize+'px '+ gLines[i].font;
            ctx.fillStyle = gLines[i].color;
            ctx.fillText(gLines[i].text, gLines[i].posX, gLines[i].posY);
        }
    };
}


function setFontColor(lineIdx,color){
    gLines[lineIdx].color = color;
}

function setFont(lineIdx, font){
    gLines[lineIdx].font = color;
}

function setFontSize(lineIdx, size){
    gLines[lineIdx].size = size;
}




// function called when user is in editor div and
// wish to return to main div to choose another meme to edit.

// function called when user click on send in "get in touch" form.
// save the form data (feilds and values) in the local storage.

// function called when user click-in a keyowrd search string 
// need to go over the memes and show only the ones who has that keyword.

// function called when user clikc-in a url to get a new image from the internet.
// add a new meme to gMeme (no id,url as user clicked)
// need to enter editor mode with that image.

// function to calculate the image rating.
// build a rating array. array key is the keyword.
// array value is the rating (number of time it was searched).
// then
})();

