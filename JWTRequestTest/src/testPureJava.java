import java.security.Key;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Scanner;
import java.util.UUID;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.sun.javafx.scene.paint.GradientUtils.Parser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;

public class testPureJava {
	private static final Key secret = MacProvider.generateKey(SignatureAlgorithm.HS256);
    private static final byte[] secretBytes = secret.getEncoded();
    private static final String base64SecretBytes = Base64.getEncoder().encodeToString(secretBytes);

    public static  String generateToken(String userID) {
        String id = UUID.randomUUID().toString().replace("-", "");
        Date now = new Date();
        Date exp = new Date(System.currentTimeMillis() + (1000 * 30)); // 30 seconds

        String token = Jwts.builder()
                .setId(id)
                .setIssuedAt(now)
                .setNotBefore(now)
                .setExpiration(exp)
                .setSubject("TESTSUBJECT")
                .setIssuer("B2B")
                .setAudience(userID)
                .signWith(SignatureAlgorithm.HS256, base64SecretBytes)
                .compact();

        return token;
    }
    public static String getIDFromJsonString(String jsonString) {
    	String name="";
    	JSONParser parser = new JSONParser();
    	try {
			Object obj = parser.parse(jsonString);
			JSONObject jsonObject=(JSONObject)obj;
			
			name = (String)jsonObject.get("id");
		} catch (ParseException e) {
			e.printStackTrace();
		}
    	return name;
    	
    }
    public static void verifyToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(base64SecretBytes)
                .parseClaimsJws(token).getBody();

        System.out.println("----------------------------");
        System.out.println("ID: " + claims.getId());
        System.out.println("Subject: " + claims.getSubject());
        System.out.println("Issuer: " + claims.getIssuer());
        System.out.println("Expiration : " + claims.getExpiration());
        System.out.println("Not Before : "+claims.getNotBefore());
        System.out.println("Audience : "+claims.getAudience());
    }

}
