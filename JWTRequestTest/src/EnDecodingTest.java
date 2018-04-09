
import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

public class EnDecodingTest {
	public static void main(String[] args) throws UnsupportedEncodingException {
		 String target = "Base64 ���ڵ� ���ڵ� �׽�Ʈ";
		 //ĳ���ͼ��� utf-8�� ������ byte�迭
	     byte[] targetBytes = target.getBytes("UTF-8");
	     
	     //���ڴ� ��ü ����
	     Encoder encoder = Base64.getEncoder();
	     
	     byte[] encodedBytes = encoder.encode(targetBytes);
	     System.out.println(new String(encodedBytes));
	     
	     //���ڵ� ��ü ����
	     Decoder decoder = Base64.getDecoder();
	     byte[] decodedBytes = decoder.decode(encodedBytes);
	     System.out.println(new String(decodedBytes,"utf-8"));
	}
}