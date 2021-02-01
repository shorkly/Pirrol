"use strict";

var BOT_KEY = '1561468131:AAGJ67rQ5kwuMDpPEj3HxfOwj2cUbsKvgBM';
var CHAT_ID = '-1001434033498';
$(document).ready(function () {
  //load more
  var $forPhotosG = $('.more');
  $('#showmemore').click(function () {
    $forPhotosG.finish();
    $forPhotosG.slideToggle("slow");
    return false;
  }); //counter animation

  $('.num').each(function () {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 8000,
      easing: 'swing',
      step: function step(now) {
        $(this).text(Math.ceil(now));
      }
    });
  }); //slider

  $('#slider').lightSlider({
    item: 1,
    loop: true,
    slideMove: 1,
    speed: 1000,
    controls: false
  }); //get in touch

  $('#send').click(function () {
    var msg = $('#comment').val();
    var name = $('#name').val();
    var email = $('#email').val();
    var title = $('#title').val();
    var msgText = encodeURI('<b>Name </b>: ' + name + '\n<b>Email </b>: ' + email + '\n<b>Title </b>: ' + title + '\n<b>Comment </b>: ' + msg);

    if (msg != '') {
      $.ajax({
        url: 'https://api.telegram.org/bot' + BOT_KEY + '/sendMessage',
        data: 'chat_id=' + CHAT_ID + '&parse_mode=html&text=' + msgText,
        type: 'get',
        dataType: 'json',
        success: function success(json) {
          if (json.ok) {
            $("#my_form")[0].reset();
            $.toast({
              text: "<b style='font-size: 15px'>Thanks, you will be contacted soon!</b>",
              icon: 'success',
              showHideTransition: 'fade',
              hideAfter: 2000,
              position: 'top-center',
              textAlign: 'center',
              loader: false
            });
          } else {//TODO: ошибка сервера
          }

          console.log(json);
        },
        error: function error(err) {//ошибка сервера
        }
      });
    } else {
      $.toast({
        text: "<b style='font-size: 15px'>Fill in all required fields!</b>",
        icon: 'error',
        showHideTransition: 'fade',
        hideAfter: 2000,
        position: 'top-center',
        textAlign: 'center',
        loader: false
      });
    }
  }); //validaing

  $('#email').keyup(function () {
    var email = $(this).val();

    if (email != '') {
      if (isValidEmail(email)) {
        $(this).css('border', '1px solid lime');
      } else {
        $(this).css('border', '1px solid red');
      }
    } else {}
  });
  $('#name').keyup(function () {
    var name = $(this).val();

    if (name != "" && name.length >= 2) {
      $(this).css('border', '1px solid lime');
    } else {
      $(this).css('border', '1px solid red');
    }
  });
  $('#contact, #toTop').click(function (e) {
    e.preventDefault();

    if ($(this).attr('href') == '#') {
      $('html, body').animate({
        scrollTop: 0
      }, 400);
    } else {
      var top = $($(this).attr('href')).offset().top;
      $('html, body').animate({
        scrollTop: top
      }, 400);
    }
  });
});

function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}