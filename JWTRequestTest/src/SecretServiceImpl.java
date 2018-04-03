import java.security.Key;
import java.util.Date;
import java.util.UUID;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;

public class SecretServiceImpl implements SecretService {

	@Override
	public String createToken(String tokenUserId) {
		String tokenStr = ""; //토큰 값이 저장될 변수
		String issure = "UserAuth4JWT"; //토큰 발급자
		String subject = "tokenData~~"; //토큰의 주제 (즉 토큰에 담길 내용)
		String id = UUID.randomUUID().toString().replace("-", "");
		Date exDate = new Date(System.currentTimeMillis() + 60000*60); //토큰 만료 시간 (임시로 1분)
		Key tokenKey = MacProvider.generateKey(SignatureAlgorithm.HS256); //토큰의 서명 알고리즘
		tokenStr = Jwts.builder()
				.setIssuer(issure)
				.setSubject(subject)
				.setAudience(tokenUserId)
				.setId(id)
				.setExpiration(exDate)
				.setIssuedAt(new Date())
				.signWith(SignatureAlgorithm.HS256, tokenKey)
				.compact(); //토큰 생성 
		return tokenStr;
	}

	@Override
	public String validToken(String tokenStr, String userID) {
		// TODO Auto-generated method stub
		return null;
	}

}
