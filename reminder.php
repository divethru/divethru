<?php
//date_default_timezone_set('UTC');

//$d = $_GET['d'];
//$ol = date('Y-m-d',strtotime($d));
//if( $ol == date("Y-m-d")){
//	echo 'gdg';
//}


define('API_ACCESS_KEY','AAAADGCJnvE:APA91bHzupr0hCJe-Gt4L8GsjK4IJkzKke3__QFLGQlgxms1LhquhYdmbdBMdEGzd6S-2xuUwmYSUlBHF2po1fOKxJrRgpUSSwbkdaNL1Vzs6K2YojwWE99ydRMXp6s6gNwndmzeagay');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');

require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;
$date = date("Y-m-d H:s");
$gmdate = gmdate("Y-m-d H:s");
$cdate = date("Y-m-d H:s",strtotime($date));
//echo strtotime($cdate)."==".$gmdate;

	$c = date("Y-m-d H:i"); //datw
	$sc = strtotime($cdate); //timestap
//  echo date_default_timezone_get()."</br>";
$rem = get('Reminder');
$tokenList = [];
foreach($rem as $k => $v){
    $rdt =  $v['datewithTime'];
 
    $sdt = strtotime($v['datewithTime']);
   // echo $rdt.'='.$sc.'</br>';
	echo "dbTime=>".$rdt.'| Server=>'.$c."</br>";
    //echo $sc - $rdt."</br>";
     
  //$date = date_create($c);
   //$tz = date_timezone_get($date);
//echo timezone_name_get($tz).'/n';
	$user = getsingle('Users/'.$v['userId']);
	foreach($user as $ky => $u){
        if($ky == 'email'){
      //      echo $u.'</br>';
        }
		if($ky == 'device_token'){
			$tokenList[] = $u;
            $chk = $sc - $rdt;
			if($rdt == $c ){
				notify($u,$v['message']);
			}
		}

	}
	
}

/*
    $data = array('datewithTime' => $c);
    
$add = add('CALL',$data);

function add($path,$data){
        $fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodePushContent = $fb->push($path, $data);
$id = $nodePushContent['name'];

$nodeUpdateContent = $fb->update($path.'/'.$id, $data);

return $nodePushContent;
}*/

function get($path){
    	$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}


function getsingle($path){
    //echo $path;
    //die;
        $fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;

}




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
          //  'registration_ids' => $tokenList, //multple token array
            'to'        => $token, //single token
            'notification' => $notification,
            'data' => $extraNotificationData
        ];

        $headers = [
            'Authorization: key=' . API_ACCESS_KEY,
            'Content-Type: application/json'
        ];


        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$fcmUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fcmNotification));
        $result = curl_exec($ch);
        curl_close($ch);


        echo $result;
}