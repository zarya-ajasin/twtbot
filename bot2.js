// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

var mediaArtsSearch = {q: "#Space", count: 1, result_type: "popular"}; 

var TWEETS_TO_REPLY = [
    "Wow, thank you for sharing this! Really informative.",
    "Space is so vast and mysterious.",
    "Have you seen the pictures JWST took recently?",
    "It takes 365 days for one revolution",
    "With so many planets, aliens have to exist right?"
];
var INTERVAL = 3*60*60*1000; // 3 hours
const endpointURL = `https://api.twitter.com/2/tweets/:id/quote_tweets`;

function TweetTop() {
    console.log("> Twitter bot is running (" + Date() + ")...")
    T.get('search/tweets', mediaArtsSearch, function(error, data){
        // log out any errors and responses
      console.log(error, data);
      // If our search request to the server had no errors...
      if (!error) {
          // ...then we grab the ID of the tweet we want to retweet...
        var id = data.statuses[0].id_str;
        var textToReply = TWEETS_TO_REPLY[Math.floor(Math.random()*TWEETS_TO_REPLY.length)];
        T.post('statuses/update', {status: textToReply, in_reply_to_status_id: id}, function(err, response) {
            if(err) {
                console.log("> Error: Status could not be updated. " + err);
            }
        });
        
      } else {
        console.log('There was an error with your hashtag search:', error);
    }
    });
}
TweetTop();
setInterval(TweetTop, INTERVAL);