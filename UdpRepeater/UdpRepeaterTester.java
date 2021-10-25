package UdpRepeater;

import java.io.IOException;
import java.net.*;

public class UdpRepeaterTester {

  //args: 
  // 0: server IP:Port
  // 1: receiver port
  // 2: message to send 
  public static void main(String[] args) {

    DatagramSocket socket = null;    

    try {

      String[] addressStrings = args[0].split(":");
      InetAddress address = InetAddress.getByName(addressStrings[0]);
      int sendPort = Integer.parseInt(addressStrings[1]);
      int receivePort = Integer.parseInt(args[1]);

      socket = new DatagramSocket(receivePort);

      byte[] sendData = args[2].getBytes();

      System.out.print("Sending...");
      DatagramPacket sendPacket = new DatagramPacket(sendData,sendData.length, address, sendPort);
      socket.send(sendPacket);
      System.out.println("Done");

      byte[] receivedata = new byte[1024];
      DatagramPacket receivePacket = new DatagramPacket(receivedata, receivedata.length);
      socket.receive(receivePacket);

      String received = new String( receivePacket.getData(), 0, receivePacket.getLength() );
      System.out.println("Received: "+received);

    } catch (IOException e) {
      System.out.println(e);
    } finally {
      if (socket != null) {
        socket.close();
      }
    }
  }
}
