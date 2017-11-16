public class CubbyHole {
    private int contents;
    private boolean available = false;

/*
The activities of the Producer and Consumer must be synchronized in two ways. 
First, the two threads must not simultaneously access the CubbyHole. 
A Java thread can prevent this from happening by locking an object. 
When an object is locked by one thread and another thread tries to call a 
synchronized method on the same object, the second thread will block until 
the object is unlocked. Locking an Object discusses this.
*/

    public synchronized int get() {
        while (available == false) {
            try {
/*
And second, the two threads must do some simple coordination. 
That is, the Producer must have some way to indicate to the Consumer that 
the value is ready and the Consumer must have some way to indicate 
that the value has been retrieved. 
The Thread class provides a collection of 
methods--wait, notify, and notifyAll--to help threads wait for 
a condition and notify other threads of when that condition changes. 
*/            	
 
                wait();
            } catch (InterruptedException e) { }
        }
        available = false;
        notifyAll();
        return contents;
    }

    public synchronized void put(int value) {
        while (available == true) {
            try {
                wait();
            } catch (InterruptedException e) { }
        }
        contents = value;
        available = true;
        notifyAll();
    }
}
