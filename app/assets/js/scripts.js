/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.3
 * Copyright 2015. MIT licensed.
 */
(function ($, window, document, undefined) {

  'use strict';

  $('.hero-day').click(function() {
    if (window.matchMedia('(min-width: 768px)').matches){
      $('.hero-day').css('max-width', '');
      $(this).removeClass('is-null');
      $(this).toggleClass('is-full');
    } else {
      $(this).removeClass('is-full');
      $(this).toggleClass('is-null');
    }
  });

  $( '.hero-night' ).click(function() {
    if (window.matchMedia('(min-width: 768px)').matches){
      $('.hero-day').css('max-width', '');
      $('.hero-day').removeClass('is-full');
      $('.hero-day').toggleClass('is-null');
    } else {
      $('.hero-day').removeClass('is-full');
      $('.hero-day').toggleClass('is-null');
    }
  });

  $( '.hero' ).mousemove(function() {
    if (window.matchMedia('(min-width: 768px)').matches){
      var x = event.pageX,
      containerWidth = $(this).outerWidth(),
      posPercent = Math.floor((x * 100) / containerWidth),
      isDay = $('.hero-day').hasClass('is-full'),
      isNight = $('.hero-day').hasClass('is-null');
      
      if(isDay && posPercent > 90) {
        $('.hero-day').css('max-width', '90%');
      } else if(isNight && posPercent < 10) {
        $('.hero-day').css('max-width', '10%');
      } else {
        $('.hero-day').css('max-width', '');
      }
    }
  });

  // Contact form
  $('#submit-btn').click(function() { 

    var proceed = true;
    //simple validation at client's end
    //loop through each field and we simply change border color to red for invalid fields   
    $('.contact-input input[required=true], .contact-input textarea[required=true]').each(function(){
      $(this).removeClass('is-empty'); 
      if(!$.trim($(this).val())){ //if this field is empty 
        $(this).addClass('is-empty'); //change border color to red   
        // proceed = false; //set do not proceed flag
      }
      //check invalid email
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
      if($(this).attr('type')==='email' && !emailReg.test($.trim($(this).val()))){
        $(this).addClass('is-empty');
        // proceed = false; //set do not proceed flag        
      } 
    });

    if(proceed){ //everything looks good! proceed...
      //get input field values data to be sent to server
      var postData = {
        'name'   : $('input[name=name]').val(), 
        'email'  : $('input[name=email]').val(), 
        'phone'  : $('input[name=phone]').val(),
        'message': $('textarea[name=message]').val()
      };

      // Ajax post data to server
      $.post('contact_me.php', postData, function(response){  
        var output = '';
        if(response.type === 'error'){ //load json data from server and output message     
          output = '<span class="is-error">'+response.text+'</span>';
        } else {
          output = '<span class="is-success">'+response.text+'</span>';
          //reset values in all input fields
          $('.contact-input input, .contact-input textarea').val(''); 
          // $('.contact-body').slideUp(); //hide form after success
        }
        $('.contact-result').hide().html(output).slideDown();
      }, 'json');
    } 
  });

  //reset previously set border colors and hide all message on .keyup()
  $('.contact-input  input, .contact-input textarea').keyup(function() { 
    $(this).removeClass('is-empty'); 
    $('.contact-result').slideUp();
  });

})(jQuery, window, document);
