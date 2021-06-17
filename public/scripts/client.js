//change header images from b/w to color using mouseover and mouseout event
function setNewProfileImage(){
  document.getElementById("profile1").src="/images/profile-hex-color.png";
}
function setOldPforileImage(){
  document.getElementById("profile1").src="/images/profile-hex.png";
}

//cross site scripting using escape function
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createTweetElement = function(tweet) {
  const safeHTML = `<span class="tweetbox_middle last_tweet">${escape(tweet.content.text)}</span>`;
  let $tweet = $(`
      <article class="article_past_tweets">
      <header class="hide tweetbox_header" >
        <img class="img_profile" src="${tweet.user.avatars}">
        <span class="historical_user_name">${tweet.user.name}</span>
        <div class="user_handle">${tweet.user.handle}</div>
      </header>
      <body>
        <p class="last_tweet">${safeHTML}</p>
        <hr class="hr"/>
      </body>
      <footer class="tweetbox_end">
        <span class="time_of_tweet">${timeago.format(tweet.created_at)}</span>
        <span class="social_media">      
          <a href=''> <i class="fas fa-flag "></i></a>
          <a href=''> <i class="fas fa-retweet"></i> </a>
          <a href=''> <i class="fas fa-heart"></i></a>
        </span>           
      </footer>     
    </article>`);
  return $tweet;
};

//AJAX GET request
const loadtweets = function() {
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
};

const renderTweets = function(tweets) {
  let tweetContainer = $("#PastTweets")
  tweetContainer.empty()
  for (const tweet of tweets) {
    const $tweetMarkup = createTweetElement(tweet);
    tweetContainer.prepend($tweetMarkup);
  }
};

$(document).ready(function() {
  //call ajax get request loadtweets to immiditly load stashed tweets
  loadtweets();
  //submit button event for when the user writes a tweet
  $("#userSubTweet").submit(function(event) {
    event.preventDefault();
    const text = $("#tweet-text").val().length;

    const errorElement =  $(this).find('.error')

    if (text > 140) { 
       errorElement.text('You said too much!')
       errorElement.addClass('errorStyle')
       errorElement.slideDown('slow');
        
    } else if (text === 0) {
      errorElement.text('You said too little')
      errorElement.addClass('errorStyle')
      errorElement.slideDown('slow');
     
    } else {
      errorElement.slideUp('fast');     
      $.post("/tweets", $("#tweet-text").serialize(), function() {
  
        loadtweets();
      });
      $("#userSubTweet").trigger('reset')
    }
  });
  //dbl arrow nav bar click to make tweet form appear

  $('#write_a_new_tweet_container').click(function() {
   $('.phantom_tweet_box').slideDown('slow');
   $('#tweet-text').focus();
  });

  //back-to-top button 
  //gently fade in and fade out once page at top
  $(window).scroll(function(){
    if($(this).scrollTop() > 100){
        $('#scroll').fadeIn();
    }else{
        $('#scroll').fadeOut();
    }
});
//when scroll button clicked, return to top page, slide down the tweet box, place cursor in tweet box
$('#scroll').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    $('.phantom_tweet_box').slideDown('slow');
    $('#tweet-text').focus();
    return false;
});


});
