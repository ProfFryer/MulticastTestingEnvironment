package UdpRepeater;

import java.io.IOException;
import java.net.*;

public class UdpRepeater {

  public static void main(String[] args) {
    if (args.length > 0) {
      int port = Integer.parseInt(args[0]);
      new UdpRepeater().run(port);
    }
    else
      System.out.println("Another lost soul trying to run this program incorrectly...");
  }

  public void run(int port) {
    DatagramSocket serverSocket = null;    
    try {
      serverSocket = new DatagramSocket(port);

      byte[] receiveData = new byte[1024];
      DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);

      while(true)
      {
        serverSocket.receive(receivePacket);
        byte[] data = receivePacket.getData();
        System.out.println("Received packet from "+receivePacket.getAddress()+":"+receivePacket.getPort()+" of size "+receivePacket.getLength()+" bytes");

        DatagramPacket sendPacket = new DatagramPacket(data, data.length,
          receivePacket.getAddress(), receivePacket.getPort());
        serverSocket.send(sendPacket);
      }
    } catch (IOException e) {
      System.out.println(e);
    } finally {
      if (serverSocket != null) {
        serverSocket.close();
      }
    }
  }
}
