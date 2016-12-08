'use strict';

//form data to local storage
function validateEmail(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

$(document).ready(function() {
	$('.btn_send').on('click', function(){
        //clear feedback msg
        $('#userFeedback').html('');

        //FORM VALIDATION
        ///// .removeClass('border'); ==> this doesnt work 
        ///// alongside with Bootstrap form-control class
        ///// so i had to add that manualy
        if($('#userName').val() === '') {
            $('#userName').css('border', 'solid 1px red').focus();
            return false;
        } else {
            $('#userName').css('border', '0');
        }
        if($('#userEmail').val() === '') {
            $('#userEmail').css('border', 'solid 1px red').focus();
            return false;
        } else {
            var isValidEmail = validateEmail($('#userEmail').val());
            if(isValidEmail){
                $('#userEmail').css('border', '0');
            } else { 
                $('#userEmail').css('border', 'solid 1px red').focus();
                return false;
            }
        }
        if($('#userSubject').val() === '') {
            $('#userSubject').css('border', 'solid 1px red').focus();
            return false;
        } else {
            $('#userSubject').css('border', '0');
        }
        if($('#userMessage').val() === '') {
            $('#userMessage').css('border', 'solid 1px red').focus();
            return false;
        } else {
            $('#userMessage').css('border', '0');
        }

        //thanks msg to the user
        $('#userFeedback').html('<strong style="color: red">Thank you for your amazing msg.</strong>');
        $('#contactForm').slideUp(1000);
        
        //add to local storage
        var userFormData = [{userName: $('#userName').val(), userEmail: $('#userEmail').val(), userSubject: $('#userSubject').val(), userMessage: $('#userSubject').val()}];
        localStorage.setItem('userFormData', JSON.stringify(userFormData));

        //reset the form
        document.querySelector('#contactForm').reset();
    });
});
