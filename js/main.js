'use strict';

var GMEMES_SIZE = 8;
var GLINES_SIZE = 2;
var LINE1 = 0;
var LINE2 = 1;

var gMemes = [];
var gLines=[];
var gImage = {context:null, url:'',width:500, height:365};
var gCanvas;
var gRatings = [];

//$(document).ready(function(){
function init(){
    console.log('meme generator init');
    
    var meme = {id:0, url:'', keyWords:[]};
   for (var i = 0; i < GMEMES_SIZE; i++) {
        meme = {id:i+1, url:'../assets/img'+(i+1)+'.jpg', keyWords:[] };
        gMemes.push(meme);
    };

    addKeywords();
    buildRatingArray()
    updateRating();
    
    var line = {posX:40, posY:40, color:'#000000', font:'Helvetica', fontSize:16, 
    text:'', align:'left'};
    gLines.push(line);
    line = {posX:40, posY:325, color:'#000000', font:'Helvetica', fontSize:16, 
    text:'', align:'left' };     
    gLines.push(line);

    console.log('after init',gRatings);
//    doEditor(gMemes[1].url);
};


function updateRating(){
    setRatingLevel();
    renderRating();
}


function addKeywords(){
    gMemes[0].keyWords = ['baby','engry','rough'];
    gMemes[1].keyWords = ['baby','fire','smile','Firefighters','evil'];
    gMemes[2].keyWords = ['dog','animal'];
    gMemes[3].keyWords = ['adolt','scary','strange'];
    gMemes[4].keyWords = ['painting','hands','dispare'];
    gMemes[5].keyWords = ['adolt','Glasses','laptop'];
    gMemes[6].keyWords = ['trump','speeking','electionד'];
    gMemes[7].keyWords = ['smoking','injoy','rough','adolt'];
}


function buildRatingArray(){  
    gMemes.forEach(function(meme) {
        meme.keyWords.forEach(function(keyword) {
            if (gRatings[keyword] === undefined){
                gRatings[keyword]= {value:keyword, rate:0, rateLevel:0};
            }
        });
    });
}


function addRating(keyword){
    if (gRatings[keyword]!== undefined) {
        gRatings[keyword].rate++;
    }
}


function setRatingLevel(){
    var minRate = 0;
    var maxRate = 0;
    var RATING_LEVELS = 5;

 //   var keyRate = gKeyWords[keyword]; 
    gRatings.forEach(function(keyword) {
        if (keyword.rate > maxRate) maxRate = rate;
        if (keyword.rate < minRate) minRate = rate;
    });

    gRatings.forEach(function(keyword) {
        if ((maxRate-minRate) !== 0){
            keyword.rateLevel = 
                Math.round (((keyword.rate-minRate) / (maxRate-minRate)) * ((maxRate-minRate)/RATING_LEVELS));
        }
        else keyword.rateLevel = 0;
    }); 
}


function renderRating(){

 //   <span class="rate_5">summer</span>
    var strHtml = '';

   for (var key in gRatings) {
       strHtml += '<span class="rate_' + 
            (gRatings[key].rateLevel+1) + 
            '">' + 
            gRatings[key].value + 
            '</span>\n';
   }        
    $('#ratingKeywords').html(strHtml);
}


function getUserImg(idx){
    doEditor(gMemes[idx-1].url);
}

// function called when user click on image.
// need to enter editor mode with that image.
function doEditor(imgUrl){
        // memeCanvas
//    var canvas = document.querySelector('#memeCanvas');
    gCanvas = document.querySelector('#memeCanvas');

    var ctx = gCanvas.getContext('2d');
    gImage.context = ctx;
    gImage.url = imgUrl;
    gImage.width = gCanvas.width;
    gImage.height = gCanvas.height;
    drawOnCanvas();
}

function drawOnCanvas() {
    var img = new Image();
 //   img.src = "assest/img1.jpg";
    img.src = gImage.url;

    img.onload = function () {
        gImage.context.drawImage(img, 0, 0, gImage.width, gImage.height);
        gLines.forEach(function(line) { 
 //           console.log('line ', line);          
            gImage.context.font = line.fontSize+'px '+ line.font;
            gImage.context.textAlign = line.align;  
            gImage.context.fillStyle = line.color;
            gImage.context.fillText(line.text, line.posX, line.posY);
        });
    }
}

function setTextLine(idx){
    var selector = "#lineText"+idx;
    gLines[idx-1].text = document.querySelector(selector).value;
 //   console.log('line=',line.value);
    drawOnCanvas();
}

function setColor(idx){
    var selector = "#colorPicker"+idx;
    gLines[idx-1].color = document.querySelector(selector).value.toString();
    drawOnCanvas();
}

function setFontFamily(idx){
    var selector = "#fontFamily"+idx;
    gLines[idx-1].font = document.querySelector(selector).value;
    drawOnCanvas();
}

function incFontSize(idx){
    gLines[idx-1].fontSize += 2;
    drawOnCanvas();
}

function decFontSize(idx){
    gLines[idx-1].fontSize -= 2;
    drawOnCanvas();
}

function alignLeft(idx){
//    console.log('in alignLeft');   
    gLines[idx-1].textAlign = 'left';
    gLines[idx-1].posX = 40;
    drawOnCanvas();
}


function alignRight(idx){
    console.log('in alignRight');   
    gLines[idx-1].textAlign = 'right';
    gLines[idx-1].posX = gImage.width-40;
    drawOnCanvas();
}

function alignCenter(idx){
    console.log('in alignCenter');   
    gLines[idx-1].textAlign = 'center';
    gLines[idx-1].posX = gImage.width/2;
    drawOnCanvas();    
}


function saveImage(elLink) {
    console.log('saveImage',elLink); 
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'perfectMeme.jpg';
}


function editUserImage(){
    console.log('editUserImage');
    console.log($(this).parent().val);
    var userRequest = querySelector('#editUserImage').value;
    console.log(userRequest);
    
    // addRating(userRequest);
    // updateRating();    
}


function autoComplete(){
    console.log('autocomplete');
 //   console.log($(this).parent().val;

     var userRequest = querySelector('#autocomplete').value;
     console.log('userRequest');
    
    // addRating(userRequest);
    // updateRating();  
}



// function called when user click-in a keyowrd search string 
// need to go over the memes and show only the ones who has that keyword.

// function called when user clikc-in a url to get a new image from the internet.
// add a new meme to gMeme (no id,url as user clicked)
// need to enter editor mode with that image.

// build a rating array. array key is the keyword.
// array value is the rating (number of time it was searched).
// then
// })();
