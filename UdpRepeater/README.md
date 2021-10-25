# UdpRepeater
A UdpPacket repeater

This repeats UDP packets sent to it back to the original sender.

### To build

The server:
`javac UdpRepeater.java`

The tester:
`javac UdpRepeaterTester.java`


### To run

The Server takes one argument, the port to listen on:
`java UdpRepeater 63001`

The tester takes three arguments: the server address:port, the port to listen on, and the message to send
`java UdpRepeaterTester 127.0.0.1:63001 63002 "This is a test message" `


# ENJOY!
