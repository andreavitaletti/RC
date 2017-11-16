import java.net.*;
import java.io.*;

public class ClientThread extends Thread {
	private Socket clientSocket = null;
	
    public ClientThread(Socket in) {
        clientSocket = in;
    }
    public void run() {
      try {
        PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
        BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        
        String inputLine;
        int porta = clientSocket.getPort();
        
		
        while ((inputLine = in.readLine()) != null) {
             out.println(inputLine);
             System.out.println("from client "+porta+":"+inputLine); 
             if (inputLine.equals("Bye."))
                break;
        }
    
        out.close();
        in.close();
        clientSocket.close();
       
      } catch (IOException e) {}
      
    }
}
