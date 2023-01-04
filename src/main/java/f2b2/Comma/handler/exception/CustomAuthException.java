package f2b2.Comma.handler.exception;

public class CustomAuthException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    private String id;
    public CustomAuthException(String message,String id){
        super(message);
        this.id = id;
    }
    public String getId(){
        return this.id;
    }
}
