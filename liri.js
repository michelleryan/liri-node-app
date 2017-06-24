// At the top of the liri.js file, write the code you need to grab the data from keys.js. 
//Then store the keys in a variable.
// Make it so liri.js can take in one of the following commands:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

'use strict'
const fs = require("fs");
var keys = require("./keys.js");

const command = process.argv[2];


const twitter = require("twitter"); //consumer_key, consumer_secret, access_token_key, access_token_secret
const spotify = require("node-spotify-api");
const request = require("request");

//console.log(keys.twitterKeys.consumer_key);
var twKeys = keys.twitterKeys;

var client = new twitter({
  consumer_key: twKeys.consumer_key,
  consumer_secret: twKeys.consumer_secret,
  access_token_key: twKeys.access_token_key,
  access_token_secret: twKeys.access_token_secret
});

//post tweets
// client.post('statuses/update', {status: 'Wow, this is amazing to post tweets from my app!'},  function(error, tweet, response) {
//   if(error) throw error;
//   console.log(tweet);  // Tweet body. 
//   //console.log(response);  // Raw response object. 
// });

//get my tweets
if (command == 'my-tweets') {
	var params = {screen_name: 'mryan85268'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
			console.log(tweets[1].text);
		}
	});
}


