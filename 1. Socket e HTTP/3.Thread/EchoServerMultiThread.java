import java.net.*;
import java.io.*;

public class EchoServerMultiThread {
    public static void main(String[] args) throws IOException {

        ServerSocket serverSocket = null;
        try {
            serverSocket = new ServerSocket(4444);
        } catch (IOException e) {
            System.err.println("Could not listen on port: 4444.");
            System.exit(1);
        }

        Socket clientSocket = null;
        try {
        	while (true) {
            	clientSocket = serverSocket.accept();
            	new ClientThread(clientSocket).start();
            }
        } catch (IOException e) {
            System.err.println("Accept failed.");
            System.exit(1);
        }

        
    }
}
