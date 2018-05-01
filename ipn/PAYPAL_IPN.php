<?php
session_start();
class PAYAPAL_IPN
{
	
	public function __construct(){
		
		
		//$this->_url = "https://www.sandbox.paypal.com/cgi-bin/webscr";
		$this->_url = "https://ipnpb.sandbox.paypal.com/cgi-bin/webscr";
		
	}
	
	
	public function run()
	{
		
			$postFields = 'cmd=_notify-validate';
		
		foreach($_POST as $key => $value){
			$_SESSION[$key] = $value;
			$postFields .= "&$key=$value";
		}
		
		
		$ch = curl_init();		
		curl_setopt($ch, CURLOPT_URL, $this->_url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
		//curl_setopt($ch, CURLOPT_SSLVERSION, 6);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
     //   curl_setopt($ch, CURLOPT_SSL_CIPHER_LIST, 'TLSv1.2');
	//	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
		//curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);
//
		// Set TCP timeout to 30 seconds
		//curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
		//curl_setopt($ch, CURLOPT_HTTPHEADER, array('Connection: Close', 'User-Agent: company-name'));
		$res = curl_exec($ch);
		//echo curl_error($ch);
		curl_close($ch);

		$f = fopen('result.txt', 'w');
		fwrite($f, $res . '-----' . $postFields. '----' . $_SESSION["userid"]);
		$_SESSION["field"] = $postFields;
		echo $res.$_SESSION["userid"];
	}
	
}




?>