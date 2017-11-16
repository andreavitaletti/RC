import java.net.*;
import java.io.*;

public class ConnectionURLSimpleWebBrowser {
   
    public static void main(String[] args){
	URL url = null;
	try {
	    url = new URL("http://172.17.0.2/post.php");
	} catch(MalformedURLException e) {
	    e.printStackTrace();
	    System.exit(1);
	}
	URLConnection connection = null;
	InputStream istr = null;
	OutputStream ostr = null;
	try {
	    connection = url.openConnection();
	    connection.setDoOutput(true);
	    connection.connect();
	    ostr = connection.getOutputStream();
	} catch(IOException e) {
	    e.printStackTrace();
	    System.exit(1);
	}

	DataOutputStream writer = new DataOutputStream(ostr);
	try {
	    writer.writeBytes("name="+args[0]);
	    writer.flush();
	    writer.writeBytes("&email="+args[1]);
	    writer.flush();
	    writer.close();
	} catch(IOException e) {
	    e.printStackTrace();
	    System.exit(1);
	}

	// After writing is over, we can read the reply
	try {
	    istr = connection.getInputStream();
	} catch(IOException e) {
	    e.printStackTrace();
	    System.exit(1);
	}
	BufferedReader reader = 
		new BufferedReader(new InputStreamReader(istr));
	String line;
        try {
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(3);
        }

    }
}
