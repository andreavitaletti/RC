import java.net.*;
import java.io.*;

public class SimpleWebServer {
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
			// https://stackoverflow.com/questions/4758525/carriage-return-and-new-line-with-java-and-readline
			if (inputLine.length() == 0) break;  
        	System.out.println(inputLine);
        	                 
        }
        
        String message = new String(args[0]);
        
        out.println("HTTP/1.1 200 ok\r\n");
        out.println("<html> \r\n");
        out.println("<head> \r\n");
        out.println("<title> index </title>\r\n");
        out.println("</head> \r\n");
        out.println("<body> \r\n");
        out.println("<p><b>"+message+"</b></p> \r\n");
        out.println("</body> \r\n");
        out.println("</html> \r\n");
        
        
        
        
        
        
        
        out.close();
        in.close();
        clientSocket.close();
        serverSocket.close();
    }
}



