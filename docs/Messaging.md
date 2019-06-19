All the technologies we have discussed so far are based on the client server mechanism. Client Server is inherently synchronous: the client makes a requests and waits for the response by the server. In some case, this is not possible, because the client could not know in advance when to make a request. As an example, if you want to develop a solution in which a client want to know when a door is open, the client cannot know in advance when to place the request. In these cases, you have basically 2 options: 1) polling, namely continuously query the server in the hope to intercept the interesting event, 2) relay on a completely different protocol based on messages. 

Messages are inherently asynchronous. They are generated only when a specific event is fired. 


[RabbitMq](https://www.rabbitmq.com/getstarted.html) is a widely used open source message broker.

It provides excellent tutorials to understand [AMQP](https://www.amqp.org/)