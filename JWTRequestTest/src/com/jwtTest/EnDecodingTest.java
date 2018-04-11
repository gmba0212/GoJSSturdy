package com.jwtTest;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

public class EnDecodingTest {
	public static void main(String[] args) throws UnsupportedEncodingException {
		 String target = "Base64 eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MjM0MzE4NDMsImp0aSI6ImJiZjQxZjM4YWI3YjQzMGVhZTI4MzA4Mjk1NDU1NjZiIiwibmJmIjoxNTIzNDMxODQzLCJleHAiOjE1MjM0MzQ4NDMsInN1YiI6IlRFU1RTVUJKRUNUIiwiaXNzIjoiQjJCIiwiYXVkIjoic2FtcGxlSUQifQ.w1w9PgjCFgTlJXQ4Y7dfgQEfxTMAVtC-88YcAzMCvt4 디코딩 테스트";
		 String tmp[] = target.split("\\.");
	     //디코딩 객체 생성
	     Decoder decoder = Base64.getDecoder();
	     
	     byte[] decodedBytes = decoder.decode(tmp[1]);
	     System.out.println(new String(decodedBytes,"utf-8"));
	}
}