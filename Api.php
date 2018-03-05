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
                  'AWS SDK for PHP</a>.</p><a href="http://localhost/DiveThru/Api.php?apicall=email-verification&uid='.$id.'>Click here to verify</a>');*/

define('HTMLBODY','<center><div style=" width:50%; background-color:#66348b; padding:20px; color:#FFF; font-size:29px; text-align:center;">Verify Your DiveThru Email</div></center><br>'.
                  '<div style="background-color:#F0F8FF; width:52%;  margin-left:306px; padding:18px 5px 6px 11px;"><p>Dear DiveThru User,</p>'.
                  '<p> We Have Received a request to authorize this email address for use with DiveThru just click the following link to verify your email address. Once we confirm that 
                      you are really you ,we will give you some additional information to help you get started with DiveThru.</p>'.
                  '<a href="http://34.215.40.163/Api.php?apicall=email-verification&uid='.$id.'">Click here to verify</a>'.'<p>Your request will not be processed unless you confirm address using this URL This link expire in 7 days after your original verification request. </p>'.
                  '<p>Sincerely,</p>'.
                  '<p>DiveThru Team.</p></div>');
                  
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


if(isset($_GET['apicall']))
{


		switch ($_GET['apicall']) {
			case 'email-verify':
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
		case 'email-verification':
				if(isTheseGETParametersAvailable(array('uid'))){

						$uid = $_GET['uid'];

							$USER = getsingle('/Users/' . $uid);
					$date = $USER['registered_on'];
					$_SESSION['email'] = $USER['email'];
					$s = strtotime($date);		
					$dt =  strtotime("+7 day", $s);
					$cdate = strtotime(date("Y-m-d H:i:s"));
					$current = date("Y-m-d H:i:s");
				//	echo $current;
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