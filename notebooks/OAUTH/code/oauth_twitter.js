
// https://gist.github.com/1964797

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('express-logger');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var inspect = require('util-inspect');
var oauth = require('oauth');

var app = express();

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('code/twitter_credentials.json', 'utf8'));
var _twitterConsumerKey = obj.twitterConsumerKey;
var _twitterConsumerSecret = obj.twitterConsumerSecret;

function consumer() {
    return new oauth.OAuth(
        "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
        _twitterConsumerKey, _twitterConsumerSecret, "1.0A", "http://127.0.0.1:8080/sessions/callback", "HMAC-SHA1");
}



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger({ path: "log/express.log"}));
app.use(cookieParser());
app.use(session({ secret: "very secret", resave: false, saveUninitialized: true}));

/*app.dynamicHelpers({
    session: function(req, res){
        return req.session;
    }
});
*/

app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/sessions/connect', function(req, res){
    consumer().getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
        if (error) {
            res.status(500).send("Error getting OAuth request token : " + sys.inspect(error));
        } else {
            req.session.oauthRequestToken = oauthToken;
            req.session.oauthRequestTokenSecret = oauthTokenSecret;
            res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);
        }
    });
});

app.get('/sessions/callback', function(req, res){
    console.log(">>"+req.session.oauthRequestToken);
    console.log(">>"+req.session.oauthRequestTokenSecret);
    console.log(">>"+req.query.oauth_verifier);
    consumer().getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
        if (error) {
            res.status(500).send("Error getting OAuth access token : " + sys.inspect(error) + "["+oauthAccessToken+"]"+ "["+oauthAccessTokenSecret+"]"+ "["+sys.inspect(results)+"]");
        } else {
            req.session.oauthAccessToken = oauthAccessToken;
            req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
            // Right here is where we would write out some nice user stuff
            consumer().get("https://api.twitter.com/1.1/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
                if (error) {
                    res.status(500).send("Error getting twitter screen name : " + sys.inspect(error));
                } else {
                    console.log("data is %j", data);
                    data = JSON.parse(data);
                    req.session.twitterScreenName = data["screen_name"];
                    res.send('You are signed in: ' + req.session.twitterScreenName)
                }
            });
        }
    });
});

app.listen(8080);