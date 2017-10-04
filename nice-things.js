var TwitterPackage = require('twitter');
 
// replace the words in caps with the keys that
// we saw before on apps.twitter.com
var secret = {
  consumer_key: 'lM7ElAciYc2oTVyTAVEd72kmV',
  consumer_secret: '1GjciGAI0KA5GxECBwkS8nKl97ZGVrQwLsIBdjCeGZrYoBA3Oz',
  access_token_key: '285700750-VQrJuZSuJRL8uehzqsAmFgEtuO89QZrJmztJB86d',
  access_token_secret: '0DdZ0GgwTCDEyCi3klpMbaBh6zIdOJeo0x8AR50JDjz6w'
}
 
var Twitter = new TwitterPackage(secret);
 
var query = "awesome";
Twitter.get('search/tweets', {q: query, count: 5, lang:"en"}, function(error, tweets, response) {
    
   var tweet_list = tweets['statuses'];
    
   for (var i = 0; i < tweet_list.length; i++) {
        if ('retweeted_status' in tweet_list[i]) {
            continue;
        } 
        var screen_name = tweet_list[i].user.screen_name;
        var message = "@" + screen_name + " you're awesome";
        var tweet_id = tweet_list[i].id_str
 
        try {
            Twitter.post('statuses/update', {"status": message, "in_reply_to_status_id":tweet_id}, function(error, tweet, response){
                 console.log("Tweet posted successfully!");
            });
        }
 
        catch(err) {
            console.log(err);
        }
   }
});