import java.net.*;
import java.io.*;

public class SimpleWebServerMultiThread {
    public static void main(String[] args) 
    	throws IOException {
    	
    	char c='A';

        ServerSocket serverSocket = null;
        try {
            serverSocket = new ServerSocket(4444);
        } catch (IOException e) {
            System.err.println("Could not listen on port: 4444.");
            System.exit(1);
        }
  		System.out.println("Simple Web Server Running");
        Socket clientSocket = null;
        try {
        	while (true) {
        	c++;
            clientSocket = serverSocket.accept();
            new ClientThread(clientSocket,args[0],c).start();
            }
        } catch (IOException e) {
            System.err.println("Accept failed.");
            System.exit(1);
        }

        
    }
}
