'use strict';

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

    //open canvas editor on hexagon clicked
	$('.meme_div').on('click', function(){
        $('#canvasEditor').slideToggle();
        // console.log($(this).attr('id'));
	});


	$('.btn_add_image').on('click', function(){
        $('#canvasEditor').slideToggle();
        // console.log($(this).attr('id'));
	});


    //close the canvas editor
	$('#closeCanvasEditor').on('click', function(){
        $('#canvasEditor').slideUp('slow');        
	});
    
    //scroll the page to sections
	$('#scrollPortfolio').on('click', function(){
        $('body').animate({ scrollTop: $('#portfolio').offset().top }, 1000);
        return false;
    });
	$('#scrollAbout').on('click', function(){
        $('body').animate({ scrollTop: $('#about').offset().top }, 1000);
        return false;
    });
	$('#scrollGetintouch').on('click', function(){
        $('body').animate({ scrollTop: $('#getintouch').offset().top }, 1000);
        return false;
    });

    // $('#main_nav__mobile_checkbox').on('click', function(){
    //     $('.header_div').toggleClass('fixed');
    // });
});