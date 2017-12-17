# [Based on this](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)

#Concept

OAuth 2 is an **authorization framework** that enables applications to obtain limited access to user accounts on an HTTP service.

It works by **delegating user authentication** to the service that hosts the user account, and **authorizing third-party applications** to access the user account.

#Roles

##Resource Owner: User  
who authorizes an application to access their account. The application's access to the user's account is limited to the "scope" of the authorization granted (e.g. read or write access).

## Resource / Authorization Server: API
The resource server hosts the protected user accounts, and the authorization server verifies the identity of the user then issues access tokens to the application.

From an application developer's point of view, a service's API fulfills both the resource and authorization server roles. We will refer to both of these roles combined, as the Service or API role.

##Client: Application
The client is the application that wants to access the user's account. Before it may do so, it must be authorized by the user, and the authorization must be validated by the API.

#Flow

![](img/abstract_flow.png)

1. The application requests authorization to access service resources from the user
2. If the user authorized the request, the application receives an authorization grant
3. The application requests an access token from the authorization server (API) by presenting authentication of its own identity, and the authorization grant
4. If the application identity is authenticated and the authorization grant is valid, the authorization server (API) issues an access token to the application. Authorization is complete.
5. The application requests the resource from the resource server (API) and presents the access token for authentication
6. If the access token is valid, the resource server (API) serves the resource to the application
# Application Registration

Before using OAuth with your application, you must register your application with the service. This is done through a registration form in the "developer" or "API" portion of the service's website, where you will provide the following information (and probably details about your application):

Application Name
Application Website
Redirect URI or Callback URL

The redirect URI is where the service will redirect the user after they authorize (or deny) your application, and therefore the part of your application that will handle authorization codes or access tokens.

Twitter: https://apps.twitter.com/

Google: https://console.developers.google.com/project/_/apiui/apis/library

# Client ID and Client Secret
Once your application is registered, the service will issue "client credentials" in the form of a client identifier and a client secret.

The Client ID is a publicly exposed string that is used by the service API to identify the application, and is also used to build authorization URLs that are presented to users.

The Client Secret is used to authenticate the identity of the application to the service API when the application requests to access a user's account, and must be kept private between the application and the API.

#Authorization Grant
In the Abstract Protocol Flow above, the first four steps cover obtaining an authorization grant and access token. The authorization grant type depends on the method used by the application to request authorization, and the grant types supported by the API. OAuth 2 defines four grant types, each of which is useful in different cases:

**Authorization Code:** used with server-side Applications

**Implicit:** used with Mobile Apps or Web Applications (applications that run on the user's device)

**Resource Owner Password Credentials:** used with trusted Applications, such as those owned by the service itself

**Client Credentials:** used with Applications API access

#Grant Type: Authorization Code

The authorization code grant type is the most commonly used because it is optimized for server-side applications, where source code is not publicly exposed, and Client Secret confidentiality can be maintained. This is a redirection-based flow, which means that the application must be capable of interacting with the user-agent (i.e. the user's web browser) and receiving API authorization codes that are routed through the user-agent.

![](img/auth_code_flow.png)

https://developers.google.com/identity/protocols/OAuth2WebServer

## User Authorization Request

```
https://accounts.google.com/o/oauth2/v2/auth?
 scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&
 access_type=offline&
 include_granted_scopes=true&
 state=state_parameter_passthrough_value&
 redirect_uri=http%3A%2F%2Foauth2.example.com%2Fcallback&
 response_type=code&
 client_id=282543407998-28fl097ran4brmp4rb1o65p6kram4beb.apps.googleusercontent.com
```

```
var express = require('express');
var request = require('request');
var bodyParser = require("body-parser");

var app = express();

var options = {
  url: 'https://accounts.google.com/o/oauth2/v2/auth?
   scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&
   access_type=offline&
   include_granted_scopes=true&
   state=state_parameter_passthrough_value&
   redirect_uri=http%3A%2F%2Foauth2.example.com%2Fcallback&
   response_type=code&
   client_id=282543407998-28fl097ran4brmp4rb1o65p6kram4beb.apps.googleusercontent.com',
}

app.get('/login', function(req, res){
  request.get(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body);
    }
  });
});

app.get('/', function(req, res){
  console.log("auth_done");
  res.send('the token is: ' + req.query.token);
});

app.listen(3000);

```
