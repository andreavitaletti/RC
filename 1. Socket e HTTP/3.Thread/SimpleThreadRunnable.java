import java.util.*;


public class SimpleThreadRunnable extends dummy implements Runnable {
    
    private Thread SThreadR = null;
    
    public SimpleThreadRunnable(String str) {
        super(str);
    }
  
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println(i + " " + getName());
            try {
                sleep((long)(Math.random() * 1000));
            } catch (InterruptedException e) {}
        }
        System.out.println("DONE! " + getName());
    }
    
    public static void main (String[] args) {
    
        SimpleThreadRunnable Ja = new SimpleThreadRunnable("Jamaica");
        SimpleThreadRunnable Fi =new SimpleThreadRunnable("Fiji");
        
        new Thread(Ja).start();
        new Thread(Fi).start();
        
    }
}
