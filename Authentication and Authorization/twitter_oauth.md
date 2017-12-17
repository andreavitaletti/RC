https://developer.twitter.com/en/docs/basics/authentication/overview/oauth


To get the keys: https://apps.twitter.com/
#Issuing application-only requests
##Step 1: Encode consumer key and secret

https://scottlinux.com/2012/09/01/encode-or-decode-base64-from-the-command-line/

```
echo -n '<Consumer key>:<Consumer secret>' | base64
```

```
echo -n '06N8MphpG27aMn2aN6zkNWe83:kNYt8xtYDqMbNbpSBOBYc9QHx0y909kOs5GgyIiLS8mGl2AEvW' | base64
```

The result is
```
MDZOOE1waHBHMjdhTW4yYU42emtOV2U4MzprTll0OHh0WURxTWJOYnBTQk9CWWM5UUh4MHk5MDlr
T3M1R2d5SWlMUzhtR2wyQUV2Vw==
```
Notice that:
```
MDZOOE1waHBHMjdhTW4yYU42emtOV2U4MzprTll0OHh0WURxTWJOYnBTQk9CWWM5UUh4MHk5MDlrT3M1R2d5SWlMUzhtR2wyQUV2Vw==
```

Step 2: Obtain a bearer token

```
curl -X POST \
  https://api.twitter.com/oauth2/token \
  -H 'authorization: Basic MDZOOE1waHBHMjdhTW4yYU42emtOV2U4MzprTll0OHh0WURxTWJOYnBTQk9CWWM5UUh4MHk5MDlrT3M1R2d5SWlMUzhtR2wyQUV2Vw==' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -H 'postman-token: ad20d936-a9b9-2766-d5bb-e201f5a45884' \
  -d grant_type=client_credentials
```

Step 3: Authenticate API requests with the bearer token

https://developer.twitter.com/en/docs/api-reference-index

```curl --request GET \
  --url 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=1&screen_name=twitterapi' \
  --header 'authorization: Bearer AAAAAAAAAAAAAAAAAAAAACPQigAAAAAAnxZalU90ZFS3JOqSQBuc%2FULUEhY%3DNrHdauWdelFvetLyJZqNraPav0Q384ISBlXWmgqEvoH1XmefkG'
```                      
