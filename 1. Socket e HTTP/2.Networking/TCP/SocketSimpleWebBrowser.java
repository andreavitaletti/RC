import java.io.*;
import java.net.*;

public class SocketSimpleWebBrowser {
    public static void main(String[] args) 
    	throws IOException {

        Socket echoSocket = null;
        PrintWriter out = null;
        BufferedReader in = null;
        
     
        try {
            echoSocket = new Socket("172.17.0.2", 80);
            out = new PrintWriter(
            	echoSocket.getOutputStream(), true);
            in = new BufferedReader(
            	new InputStreamReader(
                echoSocket.getInputStream()));
        } catch (UnknownHostException e) {
            System.err.println("Don't know about the host");
            System.exit(1);
        } catch (IOException e) {
            System.err.println("Couldn't get I/O for this connection.");
            System.exit(1);
        }


		out.println("GET /index.html HTTP/1.1\r");
		out.println("Host: 172.17.0.2\r");
		out.println("User-Agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36\r");
		out.println("\r");



		String data;

		while ((data = in.readLine()) != null) {
		
	    	System.out.println(data);
		}
	

		out.close();
		in.close();
		echoSocket.close();
    }
}

