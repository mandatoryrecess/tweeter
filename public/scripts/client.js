
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
  const safeHTML = `<span class="tweetbox_middle last_tweet">${escape(tweet.content.text)}</span>`;
  let $tweet = $(`
      <article class="article_past_tweets">
      <header class="hide tweetbox_header" >
        <img class="img_profile" src="${tweet.user.avatars}">
        <span class="historical_user_name">${tweet.user.name}</span>
        <div class="user_handle">${tweet.user.handle}</div>
      </header>
        <p class="last_tweet">${safeHTML}</p>
        <hr class="hr"/>
      <footer class="tweetbox_end">
        <span class="time_of_tweet">${tweet.created_at}</span>
        <span class="social_media">      
          <a href=''> <i class="fas fa-hippo "></i></a>
          <a href=''> <i class="fas fa-apple-alt"></i> </a>
          <a href=''> <i class="fas fa-bell"></i></a>
        </span>           
      </footer>     
    </article>`);
  return $tweet;
};

const loadtweets = function() {
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
};

const renderTweets = function(tweets) {
  let tweetContainer = $("#articlePastTweets")
  tweetContainer.empty()
  for (const tweet of tweets) {
    const $tweetMarkup = createTweetElement(tweet);
    tweetContainer.prepend($tweetMarkup);
  }
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

