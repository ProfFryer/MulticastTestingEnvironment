# start from the most recent opensource Java Development Kit.
FROM openjdk

# Install the firewall
RUN yum -y install iptables

# Install some helpful networking tools
RUN yum -y install net-tools

# Install a simple web server
RUN yum -y install nodejs

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


