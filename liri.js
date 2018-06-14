
//Dependencies
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require('fs');
var request = require("request");


//Command variables
var command = process.argv[2];
var parameter = process.argv[3];


//Access key variables
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//switch cases to compare to user-input command
switch (command) {
    case "my-tweets":
    showTweets();
    break;

    case "spotify-this-song":
    showSong();
    break;

    case "movie-this":
    showMovie(parameter);
    break;

    case "do-what-it-says":
    doWhat(parameter);
    break;
};

function showTweets() {
    var params = {screen_name: 'GwatesWath'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("\n" + params.screen_name + "'s most recent tweets: ");
            for (var i = 0; i < tweets.length; i++) {
                var tweet = ('\n' + "Created On: " + tweets[i].created_at + '\n' + tweets[i].text + '\n');
                console.log(tweet);

                fs.appendFile("log.txt", tweet, function(err) {

                    if (err) {
                      console.log(err);
                    }
                    else {
                      return;
                    }
                  
                  });
            }
        }
    });
}


function showSong() {
    if (!parameter) {
        parameter = "Raspberry Beret";
    }
    spotify.search({ type: 'track', query: parameter }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    var song = data.tracks.items[0];
    console.log("\n" + "Artist: " + song.artists[0].name);
    console.log("\n" + "Song Title: " + song.name);
    console.log("\n" + "Album Name: " + song.album.name);
    console.log("\n" + "Song Preview URL: " + song.preview_url + "\n");

    fs.appendFile("log.txt", '\n' + '\n' + "Artist: " + song.artists[0].name + '\n' + '\n' + "Song Title: " + song.name + '\n' + '\n' + "Album Name: " + song.album.name + '\n' + '\n' + "Song Preview URL: " + song.preview_url + "\n", function(err)    {

        if (err) {
          console.log(err);
        }
        else {
          return;
        }
      
      });
    });
}

function showMovie() {

    if (!parameter) {
        parameter = "Ghostbusters";
    }

    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + parameter;
    request(queryUrl, function (error, response, body) {
    console.log("\n" + 'Movie Name: ' + JSON.parse(body).Title); 
    console.log("\n" + 'Release Year: ' + JSON.parse(body).Year); 
    console.log("\n" + 'IMDB Rating: ' + JSON.parse(body).imdbRating); 
    console.log("\n" + 'Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value); 
    console.log("\n" + 'Country Produced: ' + JSON.parse(body).Country); 
    console.log("\n" + 'Language: ' + JSON.parse(body).Language); 
    console.log("\n" + 'Plot: ' + JSON.parse(body).Plot); 
    console.log("\n" + 'Actors: ' + JSON.parse(body).Actors + "\n"); 

    fs.appendFile("log.txt", '\n' + '\n' + "Movie Name: " + JSON.parse(body).Title + '\n' + '\n' + "Release Year: " + JSON.parse(body).Year + '\n' + '\n' + "IMDB Rating: " + JSON.parse(body).imdbRating + '\n' + '\n' + "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "Country Produced: " + JSON.parse(body).Country + '\n' + '\n' + "Language: " + JSON.parse(body).Language + '\n' + '\n' + "Plot: " + JSON.parse(body).Plot + '\n' + '\n' + "Actors: " + JSON.parse(body).Actors + '\n', function(err)    {

        if (err) {
          console.log(err);
        }
        else {
          return;
        }
      
    });
    });
}

function doWhat() { 
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
        var output = data.split(",");
        command = output[0];
        parameter = output[1];

        var spotify = new Spotify(keys.spotify);
        
        spotify.search({ type: 'track', query: parameter }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var song = data.tracks.items[0];
            console.log("\n" + "Artist: " + song.artists[0].name);
            console.log("\n" + "Song Title: " + song.name);
            console.log("\n" + "Album Name: " + song.album.name);
            console.log("\n" + "Song Preview URL: " + song.preview_url + "\n");

            fs.appendFile("log.txt", '\n' + '\n' + "Artist: " + song.artists[0].name + '\n' + '\n' + "Song Title: " + song.name + '\n' + '\n' + "Album Name: " + song.album.name + '\n' + '\n' + "Song Preview URL: " + song.preview_url + "\n", function(err)    {

                if (err) {
                  console.log(err);
                }
                else {
                  return;
                }
              
              });
            });
    })
    
}
