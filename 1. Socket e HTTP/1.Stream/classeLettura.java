import java.io.*;
public class classeLettura { 
	public static void main(String args[]) throws IOException {
		InputStream stdIn = System.in;
		String inputLine;

		InputStreamReader in = new InputStreamReader(stdIn);
		BufferedReader myReader = new BufferedReader(in);
		try {
			inputLine = new String(myReader.readLine());
		}
		catch (IOException e) {throw e;}
		System.out.println("Hai scritto "+inputLine);
	}		
} 