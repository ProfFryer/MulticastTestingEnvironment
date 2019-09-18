# MulticastTestEnvironment
A Docker environment for testing networking Java programs

This uses the Docker OpenJDK container with added iptables to run Java applications.  A web interface is provided to dynamically block containers from talking with certain other containers as needed for testing.  Although originally designed for testing multicast applications, it can work with any networking java application.

### To build
This will also build any java files in the current directory in the container.

`docker build -t javaapptest . `

### To create the node network
Only needs to be done once.

`docker network create --subnet=172.18.0.0/16 nodenet `


### To Run (for example, node 1)
This will ultimately run the java Main class as an application.

`docker run -it --cap-add=NET_ADMIN --net nodenet --ip 172.18.0.21 javaapptest 1 `

### To Run (node 2):
`docker run -it --cap-add=NET_ADMIN --net nodenet --ip 172.18.0.22 javaapptest 2 `

### To Block Nodes 2 and 3 on Node 1
Using the block=ip http query parameter.

`curl "http://172.18.0.21:8080/?block=172.18.0.22&block=172.18.0.23" `

### To unblock Node 2 on Node 1
Using the unblock=ip http query parameter.

`curl "http://172.18.0.21:8080/?unblock=172.18.0.22" `

Note that multiple commands can be appended on one URL.

# ENJOY!
