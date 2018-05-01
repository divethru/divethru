<?php
session_start();
$id = $_GET['uid'];
$mill = $_POST['mail'];
$_SESSION['uid'] = $id;
$_SESSION['email'] = $mill;
/*
if(!isset($_POST['mail'])){

  die;
}*/

// Replace path_to_sdk_inclusion with the path to the SDK as described in 
// http://docs.aws.amazon.com/aws-sdk-php/v3/guide/getting-started/basic-usage.html
define('REQUIRED_FILE','http://docs.aws.amazon.com/aws-sdk-php/v3/guide/getting-started/basic-usage.html'); 
                                                  
// Replace sender@example.com with your "From" address. 
// This address must be verified with Amazon SES.
define('SENDER', 'coldfinlab@gmail.com');           

// Replace recipient@example.com with a "To" address. If your account 
// is still in the sandbox, this address must be verified.
define('RECIPIENT', $mill);    

// Specify a configuration set. If you do not want to use a configuration
// set, comment the following variable, and the 
// 'ConfigurationSetName' => CONFIGSET argument below.
//define('CONFIGSET','ConfigSet');
define('AWS_KEY', 'AKIAIY3G6CBISB2IMQHA');
define('AWS_SECRET', '0nkk7a/kEddLii4pPCATIaLT2e0/7XYleEEa9R3g');
// Replace us-west-2 with the AWS Region you're using for Amazon SES.
define('REGION','us-west-2'); 

define('SUBJECT','Verify Your Email');

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

try {
     $result = $client->sendEmail([
    'Destination' => [
        'ToAddresses' => [
		RECIPIENT,
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
     
	    $response['error_code'] = 0;
        $response['message'] = 'Message send ';
        $response['status'] = true;
		$response['mail'] = $mill;
} catch (SesException $error) {

    
	    $response['error_code'] = 1;
        $response['message'] = 'error';
        $response['status'] = false;
        $response['mail'] = $mill;
}
     echo  json_encode($response);
?>