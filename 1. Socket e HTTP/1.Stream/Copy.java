import java.io.*;

public class Copy {
    public static void main(String[] args) throws IOException {
	//File inputFile = new File("farrago.txt");
	File inputFile = new File("test.png");
	File outputFile = new File("copy_test.png");

        FileReader in = new FileReader(inputFile);
        FileWriter out = new FileWriter(outputFile);
        int c;

        while ((c = in.read()) != -1)
           out.write(c);

        in.close();
        out.close();
    }
}
