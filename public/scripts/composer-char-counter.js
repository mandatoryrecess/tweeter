$(document).ready(function() {
 

  $('#tweet-text').on("input", function() {
   
    const charLeft =  140 - $(this).val().length;
    const counter = $('.counter')
    counter.val(charLeft);
    if (charLeft < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black');
    };
  
  })
  
  
  });