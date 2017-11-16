import java.net.*;
import java.io.*;

public class EchoServermod {
    public static void main(String[] args) throws IOException {

        ServerSocket serverSocket = null;
        try {
            serverSocket = new ServerSocket(4444);
        } catch (IOException e) {
            System.err.println("Could not listen on port: 4444.");
            System.exit(1);
        }

        Socket clientSocket;
        while(true){
        clientSocket = null;
        try {
            clientSocket = serverSocket.accept();
        } catch (IOException e) {
            System.err.println("Accept failed.");
            System.exit(1);
        }

        PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
        BufferedReader in = new BufferedReader(
				new InputStreamReader(
				clientSocket.getInputStream()));
        String inputLine;
        

        while ((inputLine = in.readLine()) != null) {
             out.println(inputLine);
             System.out.println("from client:"+inputLine); 
             if (inputLine.equals("Bye."))
             { System.out.println ("client Bye");
                break;
            }
        }
        out.close();
        in.close();
        clientSocket.close();
    } // end while
    //serverSocket.close();
    }
}
