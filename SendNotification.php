<?php

//define('FIREBASE_URL','https://divethrutest.firebaseio.com/');
//define('FIREBASE_SECRET','gxp2ItQwCsropnMYSEtsqPxEKeJam2G5LTxoaMoE'); 
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');
define('API_ACCESS_KEY','AAAADGCJnvE:APA91bHzupr0hCJe-Gt4L8GsjK4IJkzKke3__QFLGQlgxms1LhquhYdmbdBMdEGzd6S-2xuUwmYSUlBHF2po1fOKxJrRgpUSSwbkdaNL1Vzs6K2YojwWE99ydRMXp6s6gNwndmzeagay');

require 'vendor/autoload.php';
use Firebase\Firebase;
use Firebase\Auth\TokenGenerator;
$uid = $_POST["userId"];
$u = getsingle("Users/".$uid);
$token= $u['device_token'];
$date = $_POST['datewithTime'];
$message = $_POST['message'];

function getsingle($path){
    //echo $path;
    //die;
        $fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;

}



 $fcmUrl = 'https://fcm.googleapis.com/fcm/send';
 $token='fq9WKCPUFkM:APA91bEeWbl72pLajIH_jvDOcd6bab7l5IOhXPZLnji7yzBW63iHWEiIp5waOehgD7tPjgJ-1YbipPp7fyEtlsOPPm5JiSV0LjilSdQKHvQZFUL16yMLtYipriEUwBsHOnV9vDIyyRVn';
     $notification = [
            'title' =>'title',
            'body' => 'body of message.',
            'icon' =>'myIcon', 
            'sound' => 'mySound'
        ];
        $extraNotificationData = ["message" => $notification,"moredata" =>'dd'];

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