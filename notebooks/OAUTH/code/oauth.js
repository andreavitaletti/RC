
// from https://gist.github.com/JuanJo4/e408d9349b403523aeb00f262900e768

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('express-logger');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var inspect = require('util-inspect');
var oauth = require('oauth');
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('twitter_credentials.json', 'utf8'));


var app = express();

// Get your credentials here: https://dev.twitter.com/apps
var _twitterConsumerKey = obj.twitterConsumerKey;
var _twitterConsumerSecret = obj.twitterConsumerSecret;

var consumer = new oauth.OAuth(
    "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token", 
    _twitterConsumerKey, _twitterConsumerSecret, "1.0A", "http://127.0.0.1:8080/sessions/callback", "HMAC-SHA1");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger({ path: "log/express.log"}));
app.use(cookieParser());
app.use(session({ secret: "very secret", resave: false, saveUninitialized: true}));

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.get('/sessions/connect', function(req, res){
  consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.send("Error getting OAuth request token : " + inspect(error), 500);
    } else {  
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      console.log("------------------------");
      console.log("oauthRequestToken <<"+req.session.oauthRequestToken);
      console.log("oauthRequestTokenSecret <<"+req.session.oauthRequestTokenSecret);
      res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);      
    }
  });
});

app.get('/sessions/callback', function(req, res, error){
  console.log("------------------------");
  console.log("RequestToken >>"+req.session.oauthRequestToken);
  console.log("RequestTokenSecret >>"+req.session.oauthRequestTokenSecret);
  console.log("oauth_verifier >>"+req.query.oauth_verifier);
  consumer.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send("Error getting OAuth access token : " + inspect(error) + "[" + oauthAccessToken + "]" + "[" + oauthAccessTokenSecret + "]" + "[" + inspect(res) + "]", 500);
    } else {
      req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      
      res.redirect('/home');
    }
  });
});



app.get('/home', function(req, res){
    // https://developer.twitter.com/en/docs/api-reference-index.html
    // see https://developer.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/get-account-verify_credentials
    // consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
    consumer.get("https://api.twitter.com/1.1/followers/list.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) { 
        if (error) {
        // console.log("-->",error)
        res.redirect('/sessions/connect');
      } else {
        var parsedData = JSON.parse(data);
        res.send('You are signed in: ' + inspect(parsedData.screen_name));
      } 
    });
});

app.get('*', function(req, res){
    res.redirect('/home');
});


app.listen(8080, function() {
  console.log('App runining on port 8080!');
});