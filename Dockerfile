# start from the most recent opensource Java Development Kit.
FROM ubuntu

# Install the firewall, some helpful networking tools, and NodeJS for a simple
# web server
RUN apt-get update
RUN apt-get -y install iptables net-tools nodejs openjdk-11-jdk

# Copy everything to /app and make that our working directory
COPY . /app
WORKDIR /app

# Compile everything in the directory
RUN javac *.java

# Set our bash script to run on startup
ENTRYPOINT ["/app/run/run.sh"]
CMD []

# If you want to manually run commands within the container,
# comment (#) out the previous two lines and uncomment this one. 
#CMD ["/bin/bash"]


