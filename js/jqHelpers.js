'use strict';
console.log('View Functions');


//jQuery helper funcs
$(document).ready(function() {
    ////List / Gallery view
    //classes to the el
	$('.SELECTOR_btn_view').on('click', function(){
        $('.SELECTOR_btn_view').removeClass('tools_view_btn_checked');
        $(this).addClass('tools_view_btn_checked');        
	});
    //meme change view 
    $('#galleryView').on('click', function(){
        $('#memeContainer').removeClass('felx_column');
    });
    $('#listView').on('click', function(){
        $('#memeContainer').addClass('felx_column');
    });
});