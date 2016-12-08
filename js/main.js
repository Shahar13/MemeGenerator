'use strict';

// (function() {

console.log('Hello Meme');

var GMEMES_SIZE = 8;
var GLINES_SIZE = 2;
var LINE1 = 0;
var LINE2 = 1;

var gMemes=[];
// var gRating;
var gLines=[];
var gImage = {context:null, url:'',width:400, height:300};

$(document).ready(function(){
    var meme = {id:0, url:'', keyWords:[]};
   for (var i = 0; i < GMEMES_SIZE; i++) {
        meme = {id:i+1, url:'../assets/img'+(i+1)+'.jpg', keyWords:[] };
        gMemes.push(meme);
    };

    var line = {posX:40, posY:40, color:'#000000', font:'Helvetica', fontSize:16, 
    text:'', align:'start'};
    gLines.push(line);
    line = {posX:40, posY:260, color:'#000000', font:'Helvetica', fontSize:16, 
    text:'', align:'start' };     
    gLines.push(line);

//    doEditor(gMemes[1].url);
});

function getUserImg(idx){
    doEditor(gMemes[idx-1].url);
}

// function called when user click on image.
// need to enter editor mode with that image.
function doEditor(imgUrl){
        // memeCanvas
    var canvas = document.querySelector('#memeCanvas');
    var ctx = canvas.getContext('2d');
    gImage.context = ctx;
    gImage.url = imgUrl;
    gImage.width = canvas.width;
    gImage.height = canvas.height;
    drawOnCanvas();
}

function drawOnCanvas() {
    var img = new Image();
 //   img.src = "assest/img1.jpg";
    img.src = gImage.url;

    img.onload = function () {
        gImage.context.drawImage(img, 0, 0, gImage.width, gImage.height);
        gLines.forEach(function(line) { 
            debugger 
                console.log('line ', line);          
                gImage.context.font = line.fontSize+'px '+ line.font;
                gImage.context.textAlign = line.align;  
                gImage.context.fillStyle = line.color;
                gImage.context.fillText(line.text, line.posX, line.posY);
            });
        }
}

function getUserLine(){
 //   var line = document.querySelector("#lineText");
    gLines[0].text = document.querySelector("#lineText").value;
 //   console.log('line=',line.value);
    drawOnCanvas();
}

function setColor(lineIdx,color){
    var color = document.querySelector("#colorPicker").value.toString();
    console.log('color', color);
    gLines[0].color = color;
    drawOnCanvas();
}

function setFontFamily(){  
 //   console.log('in setFontFamily');   
    var font = document.querySelector("#fontFamily").value;
 //   console.log('font',font);   
    gLines[0].font = font;
    drawOnCanvas();
}

function incFontSize(){
   var inc = document.querySelector("#incFontSize").value;
    gLines[0].fontSize += 2;
    drawOnCanvas();

}

function decFontSize(){
   var inc = document.querySelector("#decFontSize").value;
    gLines[0].fontSize -= 2;
    drawOnCanvas();
}

function alignLeft(){
    console.log('in alignLeft');   

    gLines[0].textAlign = "start";
    gLines[0].posX = 40;
    drawOnCanvas();
}

function alignRight(){
    console.log('in alignRight');   

    gLines[0].textAlign = "end";
    gLines[0].posX = gImage.width-40;
    drawOnCanvas();
}

function alignCenter(){
    console.log('in alignCenter');   
    gLines[0].textAlign = "center";
    gLines[0].posX = 200;
    drawOnCanvas();    
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
// })();

