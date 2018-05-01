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
$quote = get('DailyQuotes');
$DailyQuotes = [];


foreach ($quote as $key => $value) {
    $DailyQuotes[] = $value["qoute_description"];
}
$length = count($DailyQuotes);


function get($path){
    	$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}



if(count($DailyQuotes)>0){
        $response['error_code'] = 0;
        $response['message'] = 'Daily Quotes';
        $response['status'] = true;
        $response['quotes'] = $DailyQuotes;
        //$response['quotes'] = json_encode($DailyQuotes);
        //$response['quotes'] = $DailyQuotes[$length-1];
}else{
        $response['error_code'] = 1;
        $response['message'] = 'error';
        $response['status'] = true;
        $response['quotes'] = $DailyQuotes;
}
echo  json_encode($response);