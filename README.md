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

#ENJOY!
