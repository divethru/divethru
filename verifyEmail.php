
<?php
session_start();
$id = isset($_GET["uid"])?$_GET["uid"]:$_POST["uid"];
$_SESSION['uid'] = $id;
//define('FIREBASE_URL','https://divethrutest.firebaseio.com/');
//define('FIREBASE_SECRET','gxp2ItQwCsropnMYSEtsqPxEKeJam2G5LTxoaMoE');

define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');

define('REQUIRED_FILE','http://docs.aws.amazon.com/aws-sdk-php/v3/guide/getting-started/basic-usage.html'); 
                                                  
// Replace sender@example.com with your "From" address. 
// This address must be verified with Amazon SES.
define('SENDER', 'coldfinlab@gmail.com');           

// Replace recipient@example.com with a "To" address. If your account 
// is still in the sandbox, this address must be verified.
///define('RECIPIENT', 'companytest1130@gmail.com');    

// Specify a configuration set. If you do not want to use a configuration
// set, comment the following variable, and the 
// 'ConfigurationSetName' => CONFIGSET argument below.
//define('CONFIGSET','ConfigSet');
define('AWS_KEY', 'AKIAIY3G6CBISB2IMQHA');
define('AWS_SECRET', '0nkk7a/kEddLii4pPCATIaLT2e0/7XYleEEa9R3g');
// Replace us-west-2 with the AWS Region you're using for Amazon SES.
define('REGION','us-west-2'); 

define('SUBJECT','Verify Your Email');

/*define('HTMLBODY','<h1>AWS Amazon Simple Email Service Test Email</h1>'.
                  '<p>This email was sent with <a href="https://aws.amazon.com/ses/">'.
                  'Amazon SES</a> using the <a href="https://aws.amazon.com/sdk-for-php/">'.

define('HTMLBODY','<center><div style=" width:50%; background-color:#66348b; padding:20px; color:#FFF; font-size:29px; text-align:center;">Verify Your DiveThru Email</div></center><br>'.
                  '<div style="background-color:#F0F8FF; width:52%;  margin-left:306px; padding:18px 5px 6px 11px;"><p>Dear DiveThru User,</p>'.
                  '<p> We Have Received a request to authorize this email address for use with DiveThru just click the following link to verify your email address. Once we confirm that 
                      you are really you ,we will give you some additional information to help you get started with DiveThru.</p>'.
                  '<a href="http://34.215.40.163/verifyEmail.php?status=EmailVerify&uid='.$id.'">Click here to verify</a>'.'<p>Your request will not be processed unless you confirm address using this URL This link expire in 7 days after your original verification request. </p>'.
                  '<p>Sincerely,</p>'.
                  '<p>DiveThru Team.</p></div>');*/


define('HTMLBODY','<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
	/* FONTS */
    @media screen {
		@font-face {
		  font-family: "Lato";
		  font-style: normal;
		  font-weight: 400;
		  src: local("Lato Regular"), local("Lato-Regular"), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format("woff");
		}
		
		@font-face {
		  font-family: "Lato";
		  font-style: normal;
		  font-weight: 700;
		  src: local("Lato Bold"), local("Lato-Bold"), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format("woff");
		}
		
		@font-face {
		  font-family: "Lato";
		  font-style: italic;
		  font-weight: 400;
		  src: local("Lato Italic"), local("Lato-Italic"), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format("woff");
		}
		
		@font-face {
		  font-family: "Lato";
		  font-style: italic;
		  font-weight: 700;
		  src: local("Lato Bold Italic"), local("Lato-BoldItalic"), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format("woff");
		}
    }
    
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>
</head>
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">

<!-- HIDDEN PREHEADER TEXT -->

<center>
<table border="0" cellpadding="0" cellspacing="0" width="50%">
    <!-- LOGO -->
    <tr>
        <td bgcolor="#66348b" align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="480" >
                <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                        <a href="#" target="_blank">
                            <img alt="Logo" src="http://34.215.40.163/img/emaillogo.png" width="200" height="200" style="display: block;  font-family: "Lato", Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
                        </a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- HERO -->
    <tr>
        <td bgcolor="#66348b" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" style="width:76%;" >
                <tr>
				
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: "Lato", Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                      <h1 style="font-size: 32px; font-weight: 400; ">Verify Your DiveThru Email</h1>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <!-- COPY BLOCK -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" style="width:76%;" >
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0% 0% 0% 7%; color: #000000; font-family: "Lato", Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
				 <p style="font-size:20px; text-align:left; padding:0px 0px 0px 15px;">Dear DiveThru User,</p>
				 <p style="padding:0px 9px 0px 14px;">

We Have Received a request to authorize this email address for use with DiveThru just click the following link to verify your email address. Once we confirm that you are really you ,we will give you some additional information to help you get started with DiveThru.</p>
                </td>
              </tr>
              <!-- BULLETPROOF BUTTON -->
              <tr>
                <td bgcolor="#ffffff" align="left">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td bgcolor="#ffffff" align="center" style="padding: 15px 30px 60px 30px;">
                        <table border="0" cellspacing="0" cellpadding="0">
                          <tr>
                              <td align="center" style="border-radius: 32px;";><a href="http://34.215.40.163/verifyEmail.php?status=EmailVerify&uid='.$id.'" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #66348b; text-decoration: none; padding: 8px 51px; border-radius: 20px; border: 1px solid #7c72dc; display: inline-block;">Confirm</a>
							  </td>
                          </tr>
                        </table>
						<p style="color:#000000; text-align:left; font-family: "Lato", Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">Your request will not be processed unless you confirm address using this URL This link expire in 7 days after your original verification request.</p>
						<p style="color:#000000; text-align:left; font-family: "Lato", Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">Sincerely,</p>
						<p style="color:#000000; text-align:left; font-family: "Lato", Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">DiveThru Team.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
        </td>
    </tr>
	 
</table>
</center>
</body>
</html>');
                  
define('TEXTBODY','This email was send with Amazon SES using the AWS SDK for PHP.');

define('CHARSET','UTF-8');

require 'vendor/autoload.php';

use Aws\Ses\SesClient;
use Aws\Ses\Exception\SesException;
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;



$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

$client = SesClient::factory(array(
    'version'=> 'latest',     
    'region' => REGION,
    'credentials' => array(
    'key'       => AWS_KEY,
    'secret'    => AWS_SECRET,
  ),
    'http'    => [
        'verify' => false
    ]
));


if(isset($_GET['status']))
{


		switch ($_GET['status']) {
			case 'SendMail':
			//	echo $_GET['apicall'];
				if(isTheseParametersAvailable(array('email','uid'))){
				$email = $_POST['email']; 
				$uid = $_POST['uid']; 

				$_SESSION['email'] = $email;
					try {
							 $result = $client->sendEmail([
							'Destination' => [
								'ToAddresses' => [
									$email,
								],
							],
							'Message' => [
								'Body' => [
									'Html' => [
										'Charset' => CHARSET,
										'Data' => HTMLBODY,
									],
									'Text' => [
										'Charset' => CHARSET,
										'Data' => TEXTBODY,
									],
								],
								'Subject' => [
									'Charset' => CHARSET,
									'Data' => SUBJECT,
								],
							],
							'Source' => SENDER,
							// If you are not using a configuration set, comment or delete the
							// following line
							//'ConfigurationSetName' => CONFIGSET,
						]);
							 $messageId = $result->get('MessageId');
					//		 echo("Email sent! Message ID: $messageId"."\n");
							 $response['error'] = false; 
							$response['message'] = "Email sent!";
						} catch (SesException $error) {
							$response['error'] = true;
							$response['message'] = "The email was not sent. Error message: ".$error->getAwsErrorMessage();
						   // var_dump($error);
							 //echo("The email was not sent. Error message: ".$error->getAwsErrorMessage()."\n");
						}	
				}else{
					$response['error'] = true; 
					$response['message'] = 'required parameters are not available'; 
				}


				# code...
				break;

		case 'EmailVerify':
		
				if(isTheseGETParametersAvailable(array('uid'))){

						$uid = $_GET['uid'];

							$USER = getsingle('/Users/' . $uid);
					$_SESSION['email'] = $USER['email'];
					$date = $USER['registered_on'];
					$dates = str_replace('/', '-', $date);
					$s = strtotime($dates);		
					$dt =  strtotime("+7 day", $s);
					$cdate = strtotime(date("Y-m-d H:i:s"));
					$current = date("Y-m-d H:i:s");
					//echo $cdate.'<br>';
					//echo 'DATE'.date_diff($date,$current);;
						if($uid){

								if($cdate < $dt){
												
									$data = array('activated_on' => $current);
							
										$p = update('/Users/' . $uid, $data);
										include("email_verify.php");
								 }else{
										include("email_verify_fail.php");
									 $response['error'] = false; 
									$response['message'] = 'Email Link Expire, you can try with new registration';
								 }
							
						}else{
							$response['error'] = false; 
							$response['message'] = 'Invalid username or password';
						}		

					}

				break;

			default:
				$response['error'] = true; 
				$response['message'] = 'Invalid Operation Called';
				break;
		}
}else{
		$response['error'] = true; 
		$response['message'] = 'Invalid API Call';
}

echo json_encode($response);


function isTheseParametersAvailable($params){
		
		foreach($params as $param){
			if(!isset($_POST[$param])){
				return false; 
			}
		}
		return true; 
	}

function isTheseGETParametersAvailable($params){
		
		foreach($params as $param){
			if(!isset($_GET[$param])){
				return false; 
			}
		}
		return true; 
	}



function getsingle($path){
			$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

	//or set your own implementation of the ClientInterface as second parameter of the regular constructor
	$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

	$nodeGetContent = $fb->get($path);

	return $nodeGetContent;
	}

	function update($path,$data){
			$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

	//or set your own implementation of the ClientInterface as second parameter of the regular constructor
	$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

	$nodeUpdateContent = $fb->update($path, $data);

	return $nodeUpdateContent;
	}

?>