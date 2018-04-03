import java.security.Key;
import java.util.Date;
import java.util.UUID;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;

public class SecretServiceImpl implements SecretService {

	@Override
	public String createToken(String tokenUserId) {
		String tokenStr = ""; //��ū ���� ����� ����
		String issure = "UserAuth4JWT"; //��ū �߱���
		String subject = "tokenData~~"; //��ū�� ���� (�� ��ū�� ��� ����)
		String id = UUID.randomUUID().toString().replace("-", "");
		Date exDate = new Date(System.currentTimeMillis() + 60000*60); //��ū ���� �ð� (�ӽ÷� 1��)
		Key tokenKey = MacProvider.generateKey(SignatureAlgorithm.HS256); //��ū�� ���� �˰���
		tokenStr = Jwts.builder()
				.setIssuer(issure)
				.setSubject(subject)
				.setAudience(tokenUserId)
				.setId(id)
				.setExpiration(exDate)
				.setIssuedAt(new Date())
				.signWith(SignatureAlgorithm.HS256, tokenKey)
				.compact(); //��ū ���� 
		return tokenStr;
	}

	@Override
	public String validToken(String tokenStr, String userID) {
		// TODO Auto-generated method stub
		return null;
	}

}
