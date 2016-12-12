'use strict';

var GLINES_SIZE = 2;
var gLines=[];
var gDomCanvas;
var gImage = {context:null, url:'', width:0, height:0};


function doEditor(imgUrl){
 
    gDomCanvas = document.querySelector('#memeCanvas');
    var ctx = gDomCanvas.getContext('2d');
 
    ctx.clearRect(0, 0, gDomCanvas.width, gDomCanvas.height);
    
    gImage.context = ctx;
    gImage.url = imgUrl;
    gImage.width = gDomCanvas.width;
    gImage.height = gDomCanvas.height;

    initTextLines();
    drawOnCanvas(ctx, imgUrl);
}


function initTextLines(){
//    console.log('initTextLines');  

    var line1 = {   posX:gImage.width*0.05, posY:gImage.height*0.1, 
                    color:'#7f7f7f', font:'Helvetica', fontSize:30,
                    text:'', align:'left'};
    gLines.push(line1);

    var line2 = {   posX:gImage.width*0.05, posY:gImage.height-20, 
                    color:'#7f7f7f', font:'Helvetica', fontSize:30,
                    text:'', align:'left'};
    gLines.push(line2);

    document.querySelector("#lineText1").value = '';
    document.querySelector("#lineText2").value = '';
}


function getUserImg(idx){
    doEditor(gMemes[idx-1].url);
}


function drawOnCanvas(context,url) {
    var img = new Image();
 //   img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
//    console.log('img.src', img.src);

    img.onload = function () {
        context.drawImage(img, 0, 0, gImage.width, gImage.height);
        gLines.forEach(function(line) { 
            context.font = line.fontSize+'px '+ line.font;
            context.textAlign = line.align;  
            context.fillStyle = line.color;
            context.fillText(line.text, line.posX, line.posY);
        });
    }
}

function setTextLine(idx){
    var selector = "#lineText"+idx;
    gLines[idx-1].text = document.querySelector(selector).value;
 //   console.log('line=',line.value);
    drawOnCanvas(gImage.context, gImage.url);
}

function setColor(idx){
    var selector = "#colorPicker"+idx;
    gLines[idx-1].color = document.querySelector(selector).value.toString();
    drawOnCanvas(gImage.context, gImage.url);
}

function setFontFamily(idx){
    var selector = "#fontFamily"+idx;
    gLines[idx-1].font = document.querySelector(selector).value;
    drawOnCanvas(gImage.context, gImage.url );
}

function incFontSize(idx){
    gLines[idx-1].fontSize += 2;
    drawOnCanvas(gImage.context, gImage.url );
}

function decFontSize(idx){
    gLines[idx-1].fontSize -= 2;
    drawOnCanvas(gImage.context, gImage.url );
}


function alignLeft(idx){
    gLines[idx-1].align = 'left';
    gLines[idx-1].posX = gImage.width*0.05;
    drawOnCanvas(gImage.context, gImage.url );
}


function alignRight(idx){
//    console.log('in alignRight');   
    gLines[idx-1].align = 'right';
    gLines[idx-1].posX = gImage.width*0.95;
    drawOnCanvas(gImage.context, gImage.url );
}

function alignCenter(idx){
//    console.log('in alignCenter');   
    gLines[idx-1].align = 'center';
    gLines[idx-1].posX = gImage.width/2;
    drawOnCanvas(gImage.context, gImage.url );    
}


function saveImage(elLink) {
 //   console.log('saveImage',elLink); 
 //    console.log('gImage',gImage);   
    try{
        elLink.href = gDomCanvas.toDataURL();
    }
    catch(err) {
 //       console.log(err);
		alert("Can not save Internet reference file. Try downloading the image to your device, then re-edit the file");
        return;
	}
    elLink.download = gImage.url;
}


function editExternalImage(){
    var externalUrl = $('#editUserImage').val();
    doEditor(externalUrl);
 //   console.log(externalUrl);
}


function goBackClicked(){
    console.log('goBackClicked');
    gLines.forEach(function(line){
        line.text='';
    })
}
