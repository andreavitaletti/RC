https://www.upcloud.com/support/how-to-set-up-load-balancing/

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04

```sudo docker exec -i -t ....... /bin/bash```

apt-get update
apt-get install nano
apt-get install iputils-ping

ping node1
ping node2

https://graspingtech.com/nginx-virtual-hosts-ubuntu-16-04/

# docker GUI

```docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer```


# Virtual host

* ```mv load-balancer.conf load-balancer.conf.disabled```
* http://test1.com:8080/

# Load balancer

* ```mv default.conf default.conf.disabled```
* http://localhost:8080/webapp/
