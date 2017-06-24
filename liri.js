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

client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
  if(error) throw error;
  console.log(tweet);  // Tweet body. 
  console.log(response);  // Raw response object. 
});


