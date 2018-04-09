
import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

public class EnDecodingTest {
	public static void main(String[] args) throws UnsupportedEncodingException {
		 String target = "Base64 인코딩 디코딩 테스트";
		 //캐릭터셋을 utf-8로 지정한 byte배열
	     byte[] targetBytes = target.getBytes("UTF-8");
	     
	     //인코더 객체 생성
	     Encoder encoder = Base64.getEncoder();
	     
	     byte[] encodedBytes = encoder.encode(targetBytes);
	     System.out.println(new String(encodedBytes));
	     
	     //디코딩 객체 생성
	     Decoder decoder = Base64.getDecoder();
	     byte[] decodedBytes = decoder.decode(encodedBytes);
	     System.out.println(new String(decodedBytes,"utf-8"));
	}
}