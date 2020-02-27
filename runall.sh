#!/bin/bash

# Start a line of nodes  1 -- 2 -- 3
# Sam Fryer. 2019.

# Note: To run one, simply run the command:
# docker run -it --cap-add=NET_ADMIN --net rovernet --ip 172.18.0.21 javaapptest 1


#start rover 1 and output all to node1.txt
date -Ins >> node1.txt
docker run --cap-add=NET_ADMIN --net nodenet --ip 172.18.0.21 javaapptest 1 >> node1.txt 2>&1 &
#make sure node 1 can't see node 3
curl "http://172.18.0.21:8080/?block=172.18.0.23&indrop=0.2" >> node1.txt 2>&1 


#start rover 2 and output all to node2.txt
date -Ins >> node2.txt
docker run --cap-add=NET_ADMIN --net nodenet --ip 172.18.0.22 javaapptest 2 >> node2.txt 2>&1 &
# note that rover 2 can talk to everyone.
curl "http://172.18.0.22:8080/?indrop=0.2" >> node2.txt 2>&1 


#start rover 3 and output all to node3.txt
date -Ins >> node3.txt
docker run --cap-add=NET_ADMIN --net nodenet --ip 172.18.0.23 javaapptest 3 >> node3.txt 2>&1 &
#make sure node 3 can't see node 1
curl "http://172.18.0.23:8080/?block=172.18.0.21&indrop=0.2" >> node3.txt 2>&1


# wait for things to settle down.
sleep 10

# now simulate node 1 overtaking node 2, so the line is now  2 -- 1 -- 3

# set rover 1 to hear everything (remove block on 3)
date -Ins >> node1.txt
curl "http://172.18.0.21:8080/?unblock=172.18.0.23" >> node1.txt 2>&1 

# make sure 2 can't hear 3
date -Ins >> node2.txt
curl "http://172.18.0.22:8080/?block=172.18.0.23" >> node2.txt 2>&1 

# make sure 3 can't hear 2, and CAN hear 1
date -Ins >> node3.txt
curl "http://172.18.0.23:8080/?unblock=172.18.0.21&block=172.18.0.22"  >> node3.txt 2>&1 


# wait for things to settle down
sleep 10


# stop EVERYONE and remove instances.
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)





