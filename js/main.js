'use strict';

var GMEMES_SIZE = 8;

var gKeywords;
var gMemes = [];


function init(){
    initMemesArray();
    buildRatingArray()
    updateRating();
    // console.log(gMemes);    
    // console.log('gKeywords',gKeywords); 
};


function initMemesArray(){
   var meme = {id:0, url:'', keyWords:[]};
   for (var i = 0; i < GMEMES_SIZE; i++) {
        meme = {id:i+1, url:'assets/img'+(i+1)+'.jpg', keyWords:[] };
        gMemes.push(meme);
    };
    addKeywords();
    // var str = JSON.stringify(gMemes); 
    // console.log('str',str);
    // $.getJSON("globalmemes.json", function(json) {
    //     gMemes = json;
    // });
    // console.log(gMemes);    
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
    gMemes[6].keyWords = ['trump','speeking','election'];
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
}


function addRating(keyword){
    if (gKeywords[keyword] !== undefined) {
        gKeywords[keyword].rate++;
        return true;
    }
    return false;
}


function setRatingLevel(){
    var minRate = Infinity;
    var maxRate = 0;
    var RATING_LEVELS = 5;

    for (var key in gKeywords) {    
        if (gKeywords[key].rate > maxRate) maxRate = gKeywords[key].rate ;
        if (gKeywords[key].rate < minRate) minRate = gKeywords[key].rate;
    };

    var factor =  RATING_LEVELS / (maxRate-minRate);
 
    if ((maxRate-minRate) !== 0){
        for (var key in gKeywords) {
            gKeywords[key].rateLevel = Math.round ((gKeywords[key].rate-minRate)*factor);
        }
    };  
}


function renderKeywords(){

    var strHtml = '';

   for (var key in gKeywords) {
       strHtml += '<span class="rate_' + (gKeywords[key].rateLevel+1) + '"' + 
            'onclick="keywordClicked(\''+gKeywords[key].value+'\');">' +
            gKeywords[key].value + '</span>\n';
   }        
    $('#ratingKeywords').html(strHtml);
//    console.log('renderKeywords',gKeywords);
}


function keywordClicked(key){
    clearMemes();
    return keywordClickedAction(key);
}


function keywordClickedAction(key){
    if (addRating(key)) {
        updateRating();
        filterMemes(key);
        return true;
    }
    return false;
}


function filterMemes(key){
    gMemes.forEach(function(meme,idx) {
        var keyFound = false;

        meme.keyWords.forEach(function(keyword) {
            if (gKeywords[keyword].value === gKeywords[key].value){
                keyFound = true;
            }
        });
        var elMeme = document.querySelector('.img'+(idx+1));
        if (keyFound){
            elMeme.classList.remove("hide");
            elMeme.classList.add("show");            
        }
    });    
}


function searchKeyword(){
//    verifyKeywords();
    var searchStr =  $('#searchkeyword').val();
    var noneEmptyGalery = false;

    var strArr = searchStr.split(" ");
    clearMemes();
    
    strArr.forEach(function(str) {
        var keyword = str.trim();
        noneEmptyGalery |= keywordClickedAction(keyword);
    });

    if (!noneEmptyGalery){
        showAllMemes();
    }   
 //   console.log('keyword:',keyword);
}


function clearMemes(){
    gMemes.forEach(function(meme,idx) {
        var elMeme = document.querySelector('.img'+(idx+1));
        elMeme.classList.remove("show");
        elMeme.classList.add("hide");            
    });    
}


function showAllMemes(){
    gMemes.forEach(function(meme,idx) {
        var elMeme = document.querySelector('.img'+(idx+1));
        elMeme.classList.remove("hide");
        elMeme.classList.add("show");            
    });    
}


// function verifyKeywords(){
//     if (gKeywords.length <= 0){ 
//         var keywordStr = localStorage.getItem('gKeywords');
//         gKeywords = JSON.parse(keywordStr);
//     }
// }