'use strict';

var GMEMES_SIZE = 8;
var LINE1 = 0;
var LINE2 = 1;

var gKeywords;
var gMemes = [];


function init(){
    console.log('meme generator init');   
    initMemesArray();
    buildRatingArray()
    updateRating();
    localStorage.setItem('gKeywords', JSON.stringify(gKeywords));
    console.log('after init',gKeywords);
};


function initMemesArray(){
   var meme = {id:0, url:'', keyWords:[]};
   for (var i = 0; i < GMEMES_SIZE; i++) {
        meme = {id:i+1, url:'../assets/img'+(i+1)+'.jpg', keyWords:[] };
        gMemes.push(meme);
    };
    addKeywords();
}


function updateRating(){
    setRatingLevel();
    renderKeywords();
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
    gKeywords = [];
    gMemes.forEach(function(meme) {
        meme.keyWords.forEach(function(keyword) {
            if (gKeywords[keyword] === undefined){
                gKeywords[keyword]= {value:keyword, rate:0, rateLevel:0};
            }
        });
    });
    console.log('buildRatingArray',gKeywords);
}


function addRating(keyword){
    if (gKeywords[keyword] !== undefined) {
        gKeywords[keyword].rate++;
    }
    console.log('addRating',gKeywords);
}


function setRatingLevel(){
    var minRate = Infinity;
    var maxRate = 0;
    var RATING_LEVELS = 5;

 //   var keyRate = gKeyWords[keyword]; 
 //   gKeywords.forEach(function(keyword) {
    for (var key in gKeywords) {    
        if (gKeywords[key].rate > maxRate) maxRate = gKeywords[key].rate ;
        if (gKeywords[key].rate < minRate) minRate = gKeywords[key].rate;
    };

    console.log('minRate=',minRate, '   maxRate=',maxRate);
    
 //   gKeywords.forEach(function(keyword) {
    var factor =  (maxRate-minRate) / RATING_LEVELS  / (maxRate-minRate);

    if ((maxRate-minRate) !== 0){
        for (var key in gKeywords) {
            gKeywords[key].rateLevel = Math.round ((gKeywords[key].rate-minRate)*factor);
    //               Math.round (((key.rate-minRate) / (maxRate-minRate)) * ((maxRate-minRate)/RATING_LEVELS));               
        }
    };  
    console.log('setRatingLevel',gKeywords);
}


function renderKeywords(){

    var strHtml = '';

   for (var key in gKeywords) {
       strHtml += '<span class="rate_' + (gKeywords[key].rateLevel+1) + '"' + 
            'onclick="keywordClicked(\''+gKeywords[key].value+'\');">' +
            gKeywords[key].value + '</span>\n';
   }        
    $('#ratingKeywords').html(strHtml);
    console.log('renderKeywords',gKeywords);
}


function keywordClicked(key){
 //   verifyKeywords();
    console.log('keywordClicked:',key);
    addRating(key);
    updateRating();
}


function searchKeyword(){
//    verifyKeywords();
    var keyword =  $('#searchkeyword').val();
    console.log('keyword:',keyword);
}


function verifyKeywords(){
    if (gKeywords.length <= 0){ 
        var keywordStr = localStorage.getItem('gKeywords');
        gKeywords = JSON.parse(keywordStr);
    }
}