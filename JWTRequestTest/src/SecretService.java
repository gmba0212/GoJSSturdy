
public interface SecretService {
	public String createToken(String tokenUserID);
	public String validToken(String tokenStr,String userID);
}
