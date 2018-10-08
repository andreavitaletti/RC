
https://hub.docker.com/_/nginx/

``` docker run --name ngix4RC -v /some/content:/usr/share/nginx/html:ro -d nginx ```

``` docker ps ```

Note that the service is running but cannot be accessed from the host

``` docker run --name ngix4RC -p 8080:80 -v '/home/andrea/Documents/University/Didattica/RC2018/docker/1. Simple Web Server/some/content':/usr/share/nginx/html:ro -d nginx ```

```sudo docker exec -i -t ....... /bin/bash```

```docker build -t some-content-nginx .```

```docker run --name some-nginx -d -p 8080:80 some-content-nginx```
