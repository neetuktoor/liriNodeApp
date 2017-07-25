// Load the fs package to read and write
var fs = require("fs");

//Include the request npm package
var request = require("request");

// TWITTER
var keys = require("./keys");
var Twitter = require("twitter");
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});
var params = {screen_name: "liri2017", count: 20};

//SPOTIFY
var Spotify = require("node-spotify-api");

var spotify = new Spotify({
  id: keys.spotifyKeys.id,
  secret: keys.spotifyKeys.secret
});

var queryId;

//Create 2 arguments
var argOne = process.argv[2];
var argTwo = process.argv[3];

// Switch-case to determine which function will get run
switch(argOne) {

	case "my-tweets":
	pullTweet();
	break;

	case "spotify-this-song":
	pullSpotifySong ();
	break;

	case "movie-this":
	movieThis ();
	break;

	case "do-what-it-says":
	pullRandom ();
	break;
};

//Create function that will pull Tweet
function pullTweet() {
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
  		for (var i = 0; i < tweets.length; i++) {
    	console.log(tweets[i].text);	
   		 }
  		} else {
  			console.log(error);
  		};
	});
};

// Create a function that will pull Spotify song
function pullSpotifySong (argTwo) {
	if (argTwo === undefined) {
		query = "The Sign";
		} else {
		query = argTwo;
	};
	spotify.search({ type: 'track', query: query }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
	console.log(JSON.stringify(data, null, 2)); 
});
};

//create a function that will pull movie from OMDB

function movieThis (){
	if (argTwo === undefined) {
		movieName = "Mr. Nobody";
		} else {
		movieName = argTwo;
	};

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

 request(queryUrl, function(error, response, body){
  	if (!error && response.statusCode === 200) {
  		console.log("Title: " + JSON.parse(body).Title);
	    console.log("Year: " + JSON.parse(body).Year);
	    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	    console.log("Country: " + JSON.parse(body).Country);
	    console.log("Language: " + JSON.parse(body).Language);
	    console.log("Plot: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);
	    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
	    console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
	
	    }
    });
};

//create a function that will pull from random.txt

function pullRandom () {
	fs.readFile("random.txt", "utf-8", function(error,data){
		var dataArray = data.split(",");
		console.log(dataArray[1]);
		pullSpotifySong(dataArray[1]);

	}); 
}





