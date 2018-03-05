<script type="text/javascript" src="register_user.js"></script>
<?php

session_start();
define('FIREBASE_URL','https://divethrutest.firebaseio.com/');
define('FIREBASE_SECRET','gxp2ItQwCsropnMYSEtsqPxEKeJam2G5LTxoaMoE');
require_once( 'vendor/autoload.php' );

use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;

$fr = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);
/*
$fb = new Facebook\Facebook([
  'app_id' => '176915049742280',
  'app_secret' => 'bf09a3463650320a8587f88cd56af469',
  'default_graph_version' => 'v2.10',
]);*/  
/*
$fb = new Facebook\Facebook([
  'app_id' => '2099629993593048',
  'app_secret' => '0ea06bd5c147a61e33230b62429c5c32',
  'default_graph_version' => 'v2.10',
]);*/
$fb = new Facebook\Facebook([
  'app_id' => '182201742534607',
  'app_secret' => '3207222a4c132b4e551170c5cc235216',
  'default_graph_version' => 'v2.10',
]);
  
$helper = $fb->getRedirectLoginHelper();  
  //print_r($helper);
  //die;
try {  
  $accessToken = $helper->getAccessToken();  
  //echo 'd'.$accessToken;
//  die;
} catch(Facebook\Exceptions\FacebookResponseException $e) {  
  // When Graph returns an error  
  
  echo 'Graph returned an error: ' . $e->getMessage();  
  exit;  
} catch(Facebook\Exceptions\FacebookSDKException $e) {  
  // When validation fails or other local issues  

  echo 'Facebook SDK returned an error: ' . $e->getMessage();  
  exit;  
}  



try {
  // Get the Facebook\GraphNodes\GraphUser object for the current user.
  // If you provided a 'default_access_token', the '{access-token}' is optional.
  $response = $fb->get('/me?fields=id,name,email,first_name,last_name,gender,birthday', $accessToken->getValue());
//  print_r($response);
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  // When Graph returns an error
  echo 'ERROR: Graph ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  // When validation fails or other local issues
  echo 'ERROR: validation fails ' . $e->getMessage();
  exit;
}
$me = $response->getGraphUser();
//print_r($me);
echo "Full Name: ".$me->getProperty('name')."<br>";
echo "First Name: ".$me->getProperty('first_name')."<br>";
echo "Last Name: ".$me->getProperty('last_name')."<br>";
echo "Email: ".$me->getProperty('email')."<br>";
echo "Facebook ID: <a href='https://www.facebook.com/".$me->getId('id')."' target='_blank'>".$me->getProperty('id')."</a></br>";
echo "gender".$me->getProperty('gender')."</br>";
 echo "Birthday".$me->getProperty('birthday')."</br>";
$_SESSION['id'] = $me->getId('id');
//  echo "profile image: "."<img src='https://graph.facebook.com/".$me->getId('id')."/picture' >";
  $fnm = $me->getProperty('first_name');
  $lnm = $me->getProperty('last_name');
  $eml = $me->getProperty('email');
  $gn = $me->getProperty('gender');
  $bdt = $me->getProperty('birthday');
  $pic = "https://graph.facebook.com/".$me->getId('id')."/picture";
  $fbid = $me->getProperty('id');
  $current = date("Y-m-d H:i:s");
  $useragent=detectDevice();
  
echo "<script type='text/javascript'>create('saaas','ss');</script>";

$data = array('first_name'=>$fnm,'last_name'=>$lnm,'gender' => $gn,'registered_on' => $current, 'fb_id' => $fbid , 'device_type'=>$useragent,"lastUpdated_on" => $current , 'device_token' => '123456' , 'email' => $eml,'login_via' => 'facebook','membership_type'=>'Free
');
 $p = add('/Users', $data);

function add($path,$data){
    	$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodePushContent = $fb->push($path, $data);
$id = $nodePushContent['name'];
if($path == '/Users'){
    
$data['user_id'] =  substr($nodePushContent['name'],1);
}/*else if($path == '/subcategory'){
    
$data['cat_id'] =  $nodePushContent['name'];
}else{
$data['audio_id'] =  $nodePushContent['name'];
}*/
$nodeUpdateContent = $fb->update($path.'/'.$id, $data);

return $nodePushContent;
}

function detectDevice(){
	$userAgent = $_SERVER["HTTP_USER_AGENT"];
	$devicesTypes = array(
        "Desktop" => array("msie 10", "msie 9", "msie 8", "windows.*firefox", "windows.*chrome", "x11.*chrome", "x11.*firefox", "macintosh.*chrome", "macintosh.*firefox", "opera"),
        "Tablet"   => array("tablet", "android", "ipad", "tablet.*firefox"),
        "Mobile"   => array("mobile ", "android.*mobile", "iphone", "ipod", "opera mobi", "opera mini"),
        "Bot"    => array("googlebot", "mediapartners-google", "adsbot-google", "duckduckbot", "msnbot", "bingbot", "ask", "facebook", "yahoo", "addthis")
    );
 	foreach($devicesTypes as $deviceType => $devices) {           
        foreach($devices as $device) {
            if(preg_match("/" . $device . "/i", $userAgent)) {
                $deviceName = $deviceType;
            }
        }
    }
    return ucfirst($deviceName);
 	}


?>


