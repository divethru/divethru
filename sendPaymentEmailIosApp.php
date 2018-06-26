
<?php
session_start();
require 'vendor/autoload.php';

use Aws\Ses\SesClient;
use Aws\Ses\Exception\SesException;
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;

 require_once("credential.php");


$mail_data = json_decode(file_get_contents('php://input'), true);


if(isset($mail_data["subcription_type"])){

    $a = explode(".", $mail_data["subcription_type"]);

 $subcrb_type = end($a);
}else{
 $subcrb_type = "";

}
 $txid= isset($mail_data["txid"])?$mail_data["txid"]:"";
 //$item_name= isset($mail_data["item_name"])?$mail_data["item_name"]:"";
 $price= isset($mail_data["price"])?$mail_data["price"]:"";
$device_token= isset($mail_data["device_token"])?$mail_data["device_token"]:"";
$date=date("d-m-Y h:i:s");

$payment_html='<div style="font-family:verdana;font-size:12px;color:#555555;line-height:14pt"><div style="width:590px"><div style="background:url(http://34.215.40.163/img/e_top.png) no-repeat;width:100%;height:75px;display:block"><div style="padding-top:30px;padding-left:50px;padding-right:50px"> <a href="http://34.215.40.163" target="_blank"><img src="http://34.215.40.163/img/de.png" style="border:none"></a></div></div><div style="background:url(http://34.215.40.163/img/e_mid.png) repeat-y;width:100%;display:block"><div style="padding-left:50px;padding-right:50px;padding-bottom:1px"><div style="border-bottom:1px solid #ededed"></div><div style="margin-bottom:30px"><span style="color:#000;"><br>Thank for your purchase. We have recevied your payment for '.$subcrb_type.' subscription. <br><br>DiveThru.<br></span></div></div></div></div></div>';

$invoice_html='<div style="font-family:verdana;font-size:12px;color:#555555;line-height:14pt"><div style="width:590px"><div style="background:url(http://34.215.40.163/img/e_top.png) no-repeat;width:100%;height:75px;display:block"><div style="padding-top:30px;padding-left:50px;padding-right:50px"> <a href="http://34.215.40.163" target="_blank"><img src="http://34.215.40.163/img/de.png" style="border:none" ></a></div></div><div style="background:url(http://34.215.40.163/img/e_mid.png) repeat-y;width:100%;display:block"><div style="padding-left:50px;padding-right:50px;padding-bottom:1px"><div style="border-bottom:1px solid #ededed"></div><div style="margin:20px 0px;font-size:30px;line-height:30px;text-align:left">Thank you</div><div style="margin-bottom:30px"><span style="color:#000;">For Subscribing, Enjoy DiveThru to find the peace within.<br><br></span><div style="margin-bottom:20px;text-align:left"><b>Transaction ID:&nbsp;</b>'.$txid.'<br><b>Date:&nbsp;</b>'.$date.'</div></div><div><div></div><span></span><table style="width:100%;margin:5px 0"><tbody><tr><td style="text-align:left;font-weight:bold;font-size:12px">Item</td><td style="text-align:right;font-weight:bold;font-size:12px" width="100">Price</td></tr></tbody></table><div style="border-bottom:1px solid #ededed"></div><table style="width:100%;margin:5px 0"><tbody><tr></tr><tr><td style="text-align:left;font-size:12px;padding-right:10px"><span><span style="letter-spacing: 2px;text-transform: uppercase;">'.$subcrb_type.'</span></span></td><td style="text-align:right;font-size:12px"><span>$'.$price.'</span><span></span></td></tr></tbody></table><div style="border-bottom:1px solid #ededed"></div><table style="width:100%;margin:5px 0"><tbody><tr><td style="text-align:right;font-size:12px;font-weight:bold;" width="150" colspan="2"><span style="">Total:&nbsp;&nbsp;&nbsp; </span>$'.$price.'</td></tr></tbody></table></div></div></div></div></div>';

$mail = isset($mail_data["email"])?$mail_data["email"]:"companytest1206@gmail.com";



$date1 = date("Y-m-d H:s");
$gmdate = gmdate("Y-m-d H:s");
$cdate = date("Y-m-d H:s",strtotime($date1));
//echo strtotime($cdate)."==".$gmdate;

                //echo "s".$_POST['message'];
//$message = "We have recevied your payment for ".$subcrb_type." subscription.";
$message = "We have recevied your payment successfully.";
$notification= notify($device_token,$message);
 //echo $notification;

$fcmUrl1 = 'http://34.215.40.163/sendEreceipt.php';
$data = array('email' => $mail, 'body' => $payment_html); 
 $ch1 = curl_init();
curl_setopt($ch1, CURLOPT_URL,$fcmUrl1);
curl_setopt($ch1, CURLOPT_POST, true);
curl_setopt($ch1, CURLOPT_POSTFIELDS, $data);
$result1 = curl_exec($ch1);
curl_close($ch1);


$invoice=sendnotfemail($invoice_html,$mail);
//echo $invoice;
// Replace path_to_sdk_inclusion with the path to the SDK as described in 
// http://docs.aws.amazon.com/aws-sdk-php/v3/guide/getting-started/basic-usage.html
 function sendnotfemail($body,$mail){
    
     define('REQUIRED_FILE','http://docs.aws.amazon.com/aws-sdk-php/v3/guide/getting-started/basic-usage.html'); 
                                                      
    // Replace sender@example.com with your "From" address. 
    // This address must be verified with Amazon SES.
    define('SENDER', 'coldfinlab@gmail.com');           

    // Replace recipient@example.com with a "To" address. If your account 
    // is still in the sandbox, this address must be verified.
    define('RECIPIENT', $mail);    

    // Specify a configuration set. If you do not want to use a configuration
    // set, comment the following variable, and the 
    // 'ConfigurationSetName' => CONFIGSET argument below.
    //define('CONFIGSET','ConfigSet');
    define('AWS_KEY', 'AKIAIY3G6CBISB2IMQHA');
    define('AWS_SECRET', '0nkk7a/kEddLii4pPCATIaLT2e0/7XYleEEa9R3g');
    // Replace us-west-2 with the AWS Region you're using for Amazon SES.
    define('REGION','us-west-2'); 

    define('SUBJECT','E-Receipt');
    
    // define('HTMLBODY','<center><div style=" width:50%; background-color:#66348b; padding:20px; color:#FFF; font-size:29px; text-align:center;">Verify Your DiveThru Email</div></center><br>'.
    //                   '<div style="background-color:#F0F8FF; width:52%;  margin-left:306px; padding:18px 5px 6px 11px;"><p>Dear DiveThru User,</p>'.
    //                   '<p> We Have Received a request to authorize this email address for use with DiveThru just click the following link to verify your email address. Once we confirm that 
    //                       you are really you ,we will give you some additional information to help you get started with DiveThru.</p>'.
    //                   '<a href="http://34.215.40.163/verifyEmail.php?status=EmailVerify&uid='.$id.'">Click here to verify</a>'.'<p>Your request will not be processed unless you confirm address using this URL This link expire in 7 days after your original verification request. </p>'.
    //                   '<p>Sincerely,</p>'.
    //                   '<p>DiveThru Team.</p></div>');

    define('HTMLBODY',$body);
                      

    define('TEXTBODY','This email was send with Amazon SES using the AWS SDK for PHP.');
    define('CHARSET','UTF-8');



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
        $response['email'] = $mail;
    } catch (SesException $error) {

        
          $response['error_code'] = 1;
            $response['message'] = 'error';
            $response['status'] = false;
            $response['email'] = $mail;
    }
     return json_encode($response);
    // echo $body;
 }

//for mobile notification


function notify($token,$msg){
    

 $fcmUrl = 'https://fcm.googleapis.com/fcm/send';
    $notification = [
            'title' =>'DiveThru',
            'body' => $msg,
            'icon' =>'myIcon', 
            'sound' => 'mySound'
        ];
        $extraNotificationData = ["message" => $notification];

        $fcmNotification = [
            //'registration_ids' => $tokenList, //multple token array
            'to'        => $token, //single token
            'notification' => $notification,
            'data' => $extraNotificationData
        ];

        $headers = [
            'Authorization: key=' . API_ACCESS_KEY,
            'Content-Type: application/json'
        ];

        if($msg){

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$fcmUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fcmNotification));
        $result = curl_exec($ch);
        curl_close($ch);
        }

        //echo $result;
       // echo $msg;
        //print_r($fcmNotification);
        return $result;
}
?>
