<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
<script type="text/javascript">
	function checkFrm() {
		if (document.frm1.id.value == "") {
			alert("id is null");
			return;
		}
		document.frm1.submit();
	}

	function checkFrm2() {
		//���� ���� �˻� : ������ ���ο���...
		if (document.frm1.id.value == "") {
			alert("ID�� �����ϴ�.");
			return false; //onsubmit�� ��� return false�� ����� ������ ���� ����!
		}
	}
</script>

</head>
<body>
	<h2>���� ���� �Է�</h2>
	<form name="frm1" method="get" action="formout_ex03.jsp"
		onsubmit="return checkFrm2()">
		<!-- onsubmit : <input type="submit" /> �� �۵��Ҷ� �˻�-->
		�̸� : <input type="text" name="name" value="Ÿ��" /><br /> ���̵� : <input
			type="text" name="id" value="whdvy" /><br /> �н����� : <input
			type="password" name="password" value="123" /><br /> <br /> ����: ��<input
			type="radio" name="gender" value="male"> ��<input type="radio"
			name="gender" value="female"><br /> <br /> ���� ���� ����1 : <br />
		��������<input type="checkbox" name="inotice" value="����" /> �������<input
			type="checkbox" name="cnotice" value="����" /> ��� Ȯ�� ����<input
			type="checkbox" name="dnotice" value="���Ȯ��" /><br /> <br /> ���� ����
		����2 : <br /> ��������<input type="checkbox" name="notice" value="����" />
		�������<input type="checkbox" name="notice" value="����" /> ��� Ȯ�� ����<input
			type="checkbox" name="notice" value="���Ȯ��" /><br /> <br /> ���� : <select
			name="job">
			<option value="1">�л�</option>
			<option value="2">������</option>
			<option value="3">��Ÿ</option>
		</select><br /> <br /> <input type="submit" value="Ȯ��submit" /> <input
			type="button" value="Ȯ��button" onclick="checkFrm()"> <input
			type="reset" value="���" />
	</form>


</body>
</html>