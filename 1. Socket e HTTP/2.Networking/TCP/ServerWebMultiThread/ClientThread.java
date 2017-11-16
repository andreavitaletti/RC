import java.net.*;
import java.io.*;

public class ClientThread extends Thread {
	private Socket clientSocket = null;
	private String message = null;
	private char c='0';
	
    public ClientThread(Socket in, String messagein,char cin) {
        clientSocket = in;
        message=messagein;
        c=cin;
    }
    public void run() {
      try {
        PrintWriter out = 
        	new PrintWriter(
        		clientSocket.getOutputStream(), true);
        BufferedReader in = 
        	new BufferedReader(
        		new InputStreamReader(
        			clientSocket.getInputStream()));
        
        
		
       String inputLine;
        

        while ((inputLine = in.readLine()) != null) {
			if (inputLine.length() == 0) break;  
        	System.out.println(inputLine);            
        }
        
         
        out.println("HTTP/1.1 200 ok\r\n");
        out.println("<html> \r\n");
        out.println("<head> \r\n");
        out.println("<title> index </title>\r\n");
        out.println("</head> \r\n");
        out.println("<body> \r\n");
        for (int i=0; i<10000; i++)
        {
        	System.out.print(c);
        	out.println("<p><b>"+message+"</b></p> \r\n");
    	}
        out.println("</body> \r\n");
        out.println("</html> \r\n");  
        out.close();
        in.close();
        clientSocket.close();
       
      } catch (IOException e) {}
      
    }
}


