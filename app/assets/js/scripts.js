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

})(jQuery, window, document);
