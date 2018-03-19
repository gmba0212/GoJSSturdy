package jwtTest;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;

public class Main {
    private static final Key secret = MacProvider.generateKey(SignatureAlgorithm.HS256);
    private static final byte[] secretBytes = secret.getEncoded();
    private static final String base64SecretBytes = Base64.getEncoder().encodeToString(secretBytes);

    private static String generateToken(String subject, String issuer, String audience) {
        String id = UUID.randomUUID().toString().replace("-", "");
        Date now = new Date();
        Date exp = new Date(System.currentTimeMillis() + (1000 * 30)); // 30 seconds

        String token = Jwts.builder()
                .setId(id)
                .setIssuedAt(now)
                .setNotBefore(now)
                .setExpiration(exp)
                .setSubject(subject)
                .setIssuer(issuer)
                .setAudience(audience)
                .signWith(SignatureAlgorithm.HS256, base64SecretBytes)
                .compact();

        return token;
    }

    private static void verifyToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(base64SecretBytes)
                .parseClaimsJws(token).getBody();

        System.out.println("----------------------------");
        System.out.println("ID: " + claims.getId());
        System.out.println("Subject: " + claims.getSubject());
        System.out.println("Issuer: " + claims.getIssuer());
        System.out.println("Expiration : " + claims.getExpiration());
        System.out.println("Not Before : "+claims.getNotBefore());
        System.out.println("Audience :: "+claims.getAudience());
    }

    public static void main(String[] args) {
        String token = generateToken("MySubject", "AH", "MyAudience");
        System.out.println("TOKEN :: "+token);
        verifyToken(token);
    }
}