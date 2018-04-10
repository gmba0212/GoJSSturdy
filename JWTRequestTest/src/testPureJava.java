import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Key;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.impl.crypto.MacProvider;

public class testPureJava {
	private static final Key secret = MacProvider.generateKey(SignatureAlgorithm.HS256);
	private static final byte[] secretBytes = secret.getEncoded();
	private static final String base64SecretBytes = Base64.getEncoder().encodeToString(secretBytes);

	public static String generateToken(String userID) {
	/*	Key secret = MacProvider.generateKey(SignatureAlgorithm.HS256);
		byte[] secretBytes = secret.getEncoded();
		String base64SecretBytes = Base64.getEncoder().encodeToString(secretBytes);
	*/	String id = UUID.randomUUID().toString().replace("-", "");
		Date now = new Date();
		Date exp = new Date(System.currentTimeMillis() + (1000 * 3000)); // 30 seconds
		System.out.println(base64SecretBytes);
		writeJwtTokenFile(base64SecretBytes);
		String token = Jwts.builder().
				setIssuedAt(now).
				setId(id).
				setNotBefore(now).
				setExpiration(exp).
				setSubject("TESTSUBJECT").
				setIssuer("B2B").
				setAudience(userID).
				signWith(SignatureAlgorithm.HS256, base64SecretBytes).
				compact();
		return token;
	}
	public String getDataFromJsonString(String data,String jsonString) {
		String res = "";
		JSONParser parser = new JSONParser();
		try {
			Object obj = parser.parse(jsonString);
			JSONObject jsonObject = (JSONObject) obj;

			res = (String) jsonObject.get(data);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return res;
	}

	public String getIDFromJsonString(String jsonString) {
		String name = "";
		JSONParser parser = new JSONParser();
		try {
			Object obj = parser.parse(jsonString);
			JSONObject jsonObject = (JSONObject) obj;

			name = (String) jsonObject.get("id");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return name;
	}

	public String verifyToken(String token) {
		String secKey = readJwtTokenFile();

		String resultMsg = "";
		try {
			Jwts.parser().setSigningKey(secKey).parseClaimsJws(token).getBody();

			resultMsg = "Pass";
		} catch (ExpiredJwtException eje) { // 토큰의 만료시간이 지난 경우
			resultMsg = "expiredTokenDate";
		} catch (SignatureException se) { // 토큰의 서명 검증이 위조되거나 문제가 생긴 경우
			resultMsg = "wrongSign";
		}
		return resultMsg;
	}

	public String readJwtTokenFile() {

		Path path = Paths.get("/Writer.txt");
		Charset cs = StandardCharsets.UTF_8;
		List<String> list = new ArrayList<String>();
		try {
			list = Files.readAllLines(path, cs);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list.get(0);

	}

	public static void writeJwtTokenFile(String jwtToken) {
		try {
			File file = new File("/Writer.txt");
			BufferedWriter buffer = new BufferedWriter(new FileWriter(file));
			buffer.write(jwtToken);
			buffer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
