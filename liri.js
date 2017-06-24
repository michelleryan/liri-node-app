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

var spotKeys = keys.spotifyKeys;
var spotifyClient = new spotify({
	id: spotKeys.id,
	secret: spotKeys.secret
});
//console.log(spotKeys.id);

var movieKeys = keys.movieKeys;
//console.log(movieKeys.apikey);

//post tweets into my twitter account
// var tweetInput = process.argv[3];
// var tparam = {status: tweetInput};

// if (command == 'post-tweet') {
// 	client.post('statuses/update', tparam,  function(error, tweet, response) {
// 	  if(error) throw error;
// 	  //console.log(tweet);  // Tweet body. 
// 	  //console.log(response);  // Raw response object. 
// 	});
// }


//get my last 20 tweets, show tweet and created date
if (command == 'my-tweets') {
	var params = {screen_name: 'mryan85268'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
		if (!error) {
			//print out the last 20 tweets
			//console.log("tweet: " + tweets[0].text);
			for (let i=0; i<20; i++) {
				var text = "tweet: " + tweets[i].text + ",Created at: " + tweets[i].created_at;
				console.log(text);
				writeLog(command, text);

			}
			
		}
	});

}

//spotify song
if (command == 'spotify-this-song') {
	var songInput = process.argv[3];

	if (songInput==null) {
		console.log("Use default song");
		var song = {type: 'track', query:'The Sign'};
	}
	else{
		var song = {
		type:'track',
		query: songInput
		}
	}
	

	spotifyClient.search(song, function(error, data){
		if (!error) {
			var songInfo = data.tracks.items[0];
			console.log(songInfo.artists[0].name);
			console.log(songInfo.name);
			console.log(songInfo.href);
			console.log(songInfo.album.name);
			var songResult = "artist: " + songInfo.artists[0].name 
									+ " || Song: " + songInfo.name + " || URL: " + songInfo.href
									+ " || Album: " + songInfo.album.name;
			writeLog(command,songResult);
		}
	});

}

//get a movie from ODMB
if (command=='movie-this') {
	var movieInput = process.argv[3];

	if (movieInput==null) {
		console.log("Use default movie");
		request('http://www.omdbapi.com/?apikey=40e9cece&t="Mr. Nobody"', function (error, data, body) {
  			if (!error) {
  				console.log(body);  //I could not get this to print the specific items requested!!
  			}
		});

	}
	else {
		request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movieInput, function(error, data, body){
			if (!error) {
				console.log(body); //I could not get this to print the specific items requested!!
			}
		})
	}

}

//do what it says 
if (command=='do-what-it-says') {
	fs.readFile("random.txt", "utf8", function (err, data) { 

		if(err) {
			return console.log(err);
		}
		
		var randomArr = data.split(",");
		var song = {
			type:'track',
			query: randomArr[1]
			}
		spotifyClient.search(song, function(error, data){
			if (!error) {
				var songInfo = data.tracks.items[0];
				var songResult = "artist: " + songInfo.artists[0].name 
									+ " || Song: " + songInfo.name + " || URL: " + songInfo.href
									+ " || Album: " + songInfo.album.name;
				console.log(songInfo.artists[0].name);
				console.log(songInfo.name);
				console.log(songInfo.href);
				console.log(songInfo.album.name);
				writeLog(command, songResult);
				}
			});
			
	});
}

function writeLog (command, text) {
	fs.appendFile('log.txt', command + ', ' + text + "\n", function(err){
					if (err) {
						console.log(err);
					}
				});
}
