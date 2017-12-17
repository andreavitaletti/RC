# NODE

[NODE on DOCKER](https://github.com/nodejs/docker-node)

```
docker build -t my-nodejs-app .

docker run -it --rm -v /home/andrea/Documents/Didattica/RC2017/node:/home/node -d --name RC_nodejs my-nodejs-app
```

```
docker ps
docker inspect fac0e279e9a4
```

```
sudo docker exec -i -t fac0e279e9a4 /bin/bash
```

