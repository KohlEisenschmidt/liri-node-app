require("dotenv").config();

var keys = require("./keys.js")
var Twitter = require('twitter');
var client = new Twitter(keys.Twitter);

// console.log(client);

//tweets from our twitter
var command = process.argv[2];

//want to be able to print 20 latest tweets
function myTweets(){  
    // console.log("");  
    var params = {screen_name: '@KohlBEisen', count:'20'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        // console.log(tweets);
        for (var i =0; i<tweets.length; i++){
            // console.log(tweets);
            // console.log(tweets[0]);
            console.log(tweets[i].text);     
        }
    }   else{
            console.log("twitter errror" + error);
        console.log("twitter response" + response);
        console.log(JSON.parse(response));     
        }
    });
}
//============================================================================================================

var Spotify = require('node-spotify-api')
var myspotify = new Spotify(keys.Spotify);

// remember to put single quotes around process.argv[3] in your terminal

function spotifyThisSong(input){
    if (input === undefined){
        input = 'The Sign Ace of Base'
    }

    myspotify.search({ type: 'track', query: input }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else if (data===null) {
            return console.log("Please insert a valid song name")
        }

        var artists = data.tracks.items[0].artists
        for (var i=0; i<artists.length; i++){
            console.log("Artists Name: " + artists[i].name);
        }
        console.log("   Song Name: " + input );
        var songInfo = data.tracks.items[0];
        console.log("  Album Name: " + songInfo.album.name);
        console.log(" Preview url: " + songInfo.preview_url);
    });
}

//=================================================================================================================
function movieThis (input){
    var request = require("request");

    if (input === undefined){
        input = 'Mr. Nobody'
    }

    // run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function(error, response, body) {        
    // request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
                // console.log(JSON.parse(body));    
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("imdbRating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where produced: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);                                                               
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}
//====================================================================================================================
function doWhatItSays(){
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }
        // We will then print the contents of data
        console.log(data);
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        var fileCommand = dataArr[0];
        var fileparameter = dataArr[1];

        switch (fileCommand) {
            case "my-tweets":
                myTweets();
                break;
            
            case "spotify-this-song":
            spotifyThisSong(fileparameter);
                break;
            
            case "movie-this":
            movieThis(fileparameter);
                break;
        }
    });
};

switch (command) {
    case "my-tweets":
    myTweets();
    break;
    
    case "spotify-this-song":
    spotifyThisSong(process.argv[3]);
    break;
    
    case "movie-this":
    movieThis(process.argv[3]);
    break;
    
    case "do-what-it-says":
    doWhatItSays();
    break;
}
    
