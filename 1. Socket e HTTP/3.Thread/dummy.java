public class dummy {
	private String d;
	
    public dummy(String str) {
        d=str;
    }
    
    public String getName() {
    	return d;
    }
    
    public void sleep(long i) throws InterruptedException {
    	int j;
    	for (j=1;j<(i*1000);j++);
    	if (i<0) throw new InterruptedException();
    }
 }
