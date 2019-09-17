# MulticastTestEnvironment
A Docker environment for testing multicast java programs

### To build
`docker build -t javaapptest . `

### To create the rover network
`docker network create --subnet=172.18.0.0/16 rovernet `


### To Run (for example, node 1)
`docker run -it --cap-add=NET_ADMIN --net rovernet --ip 172.18.0.21 javaapptest 1 `

### To Run (node 2):
`docker run -it --cap-add=NET_ADMIN --net rovernet --ip 172.18.0.22 javaapptest 2 `

### To Block Node 2 and 3 on Node 1
`curl "http://172.18.0.21:8080/?block=172.18.0.22&block172.18.0.23" `

### To unblock Node 2 on Node 1
`curl "http://172.18.0.21:8080/?unblock=172.18.0.22" `

Note that multiple commands can be appended on one URL.

# ENJOY!
