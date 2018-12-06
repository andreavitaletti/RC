[RabbitMQ](https://www.rabbitmq.com/)

[Rabbimq su docker](https://hub.docker.com/_/rabbitmq/)

[Tutorials code](https://github.com/rabbitmq/rabbitmq-tutorials)

```
docker run -d --hostname my-rabbit -p 5671:5671 -p 5672:5672 -p 15672:15672 -p 25672:25672 --name some-rabbit rabbitmq:3
```
```
docker ps
sudo docker exec -i -t fac0e279e9a4 /bin/bash
rabbitmqctl list_queues
```
