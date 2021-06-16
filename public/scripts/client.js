/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$("profile_photo").mouseover(function(){
  $("profile_photo").css("background-color", "yellow");
});
function setNewProfileImage(){
  document.getElementById("profile1").src="/images/profile-hex-color.png";
}
function setOldPforileImage(){
  document.getElementById("profile1").src="/images/profile-hex.png";
}

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const safeHTML = `<span class="tweetbox-middle lastTweet">${escape(tweet.content.text)}</span>`;
  let $tweet = $(`

  <section class="articlePastTweets a">

          <div class="hide tweetbox-header" >
            <img class="imgProfile" src="${tweet.user.avatars}">
           <span class="historicalUserName">${tweet.user.name}</span>
           <span class="userHandle">${tweet.user.handle}</span>
        </div>
        
          ${safeHTML}
          <hr class="hr"/>
        </span>
        <span class="tweetbox-end">
          <span class="timeOfTweet">${tweet.created_at}</span>
          <span class="socialMedia">      
            <a href=''> <i class="fas fa-hippo "></i></a>
            <a href=''> <i class="fas fa-apple-alt"></i> </a>
            <a href=''> <i class="fas fa-bell"></i></a>
          </span>           
          </span>     
      </section>`);
  return $tweet;
};

const renderTweets = function(tweets) {
  let tweetContainer = $("#articlePastTweets")
  tweetContainer.empty()
  for (const tweet of tweets) {
    const $tweetMarkup = createTweetElement(tweet);
    tweetContainer.prepend($tweetMarkup);
  }
};

const loadtweets = function() {
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
};

$(document).ready(function() {
  loadtweets();
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

  $('#write_a_new_tweet_container').click(function() {
   $('.phantom_tweet_box').slideDown('slow'); 
  });
});

