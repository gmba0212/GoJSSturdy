package com.jwtTest;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.*;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Key;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Scanner;
import java.util.UUID;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.impl.crypto.MacProvider;

/**
 * @author mgGong
 *
 */
public class testPureJava {

	/**
	 * @param userID
	 * @return generateToken & insert token key
	 */
	public String generateToken(String userID) {
		Key secret = MacProvider.generateKey(SignatureAlgorithm.HS256);
		byte[] secretBytes = secret.getEncoded();
		String base64SecretBytes = Base64.getEncoder().encodeToString(secretBytes);
		String id = UUID.randomUUID().toString().replace("-", "");
		Date now = new Date();
		Date exp = new Date(System.currentTimeMillis() + (1000 * 3000)); // 30 seconds
		TokenDAO tDAO = TokenDAO.getInstance();
		TokenVO tVo = new TokenVO();
		;
		tVo.setUserID(userID);
		tVo.setTokenKey(base64SecretBytes);
		tDAO.insertToken(tVo);
		String token = Jwts.builder().setIssuedAt(now).setId(id).setNotBefore(now).setExpiration(exp)
				.setSubject("TESTSUBJECT").setIssuer("B2B").setAudience(userID)
				.signWith(SignatureAlgorithm.HS256, base64SecretBytes).compact();
		return token;
	}
	
	/**
	 * @param data (json key)
	 * @param jsonString (JsonString)
	 * @return json value(key==data)
	 */
	public String getDataFromJsonString(String data, String jsonString) {
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

	/**
	 * @param request
	 * @return userID return from(request body)
	 * @throws IOException
	 */
	public String getBody(HttpServletRequest request) throws IOException {

		String body = null;
		StringBuilder stringBuilder = new StringBuilder();
		BufferedReader bufferedReader = null;

		try {
			InputStream inputStream = request.getInputStream();
			if (inputStream != null) {
				bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
				char[] charBuffer = new char[128];
				int bytesRead = -1;
				while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
					stringBuilder.append(charBuffer, 0, bytesRead);
				}
			} else {
				stringBuilder.append("");
			}
		} catch (IOException ex) {
			throw ex;
		} finally {
			if (bufferedReader != null) {
				try {
					bufferedReader.close();
				} catch (IOException ex) {
					throw ex;
				}
			}
		}

		body = stringBuilder.toString();
		return body;
	}
	
	/**
	 * get Token from Header from requestHeader
	 * @param request
	 * @return Bearer(token)
	 * @throws IOException
	 */
	public StringBuffer getAuthBearer(HttpServletRequest request) throws IOException {
		Enumeration headerNames = request.getHeaderNames();
		StringBuffer res = new StringBuffer();
		while (headerNames.hasMoreElements()) {
			String name = (String) headerNames.nextElement();
			if (name.equals("authorization")) {
				String value = request.getHeader(name);
				String resTmps[] = value.split(" ");

				res.append(resTmps[1]);
			}
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

	/**
	 * @param token
	 * @param userid
	 * @return verifyResult
	 * @throws UnsupportedEncodingException 
	 */
	public String verifyToken(String token) throws UnsupportedEncodingException {
		String secKey = "";
		String payLoadString = getPayloadJsonUserID(token);
		String userid= getDataFromJsonString("aud", payLoadString);
		TokenDAO tDAO = TokenDAO.getInstance();
		TokenVO tVo = tDAO.getTokenKey(userid);
		secKey = tVo.getTokenKey();
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
	public String getPayloadJsonUserID(String token) throws UnsupportedEncodingException {
		 String userid =null;
		 String target = token;
		 String tmp[] = target.split("\\.");
	     Decoder decoder = Base64.getDecoder();
	     byte[] decodedBytes = decoder.decode(tmp[1]);
	     return new String(decodedBytes,"utf-8");
	}
}