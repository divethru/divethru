<?php

require_once 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;
 
session_start();
 
$config = require_once 'config.php';

// create TwitterOAuth object
$twitteroauth = new TwitterOAuth($config['consumer_key'], $config['consumer_secret']);
 
// request token of application
$request_token = $twitteroauth->oauth(
    'oauth/request_token', [
        'oauth_callback' => $config['url_callback']
    ]
);
 
// throw exception if something gone wrong
if($twitteroauth->getLastHttpCode() != 200) {
    throw new \Exception('There was a problem performing this request');
}
 
// save token of application to session
$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
$_SESSION['message'] = isset($_POST["msg"])?$_POST["msg"]:"First Tweet";
$_SESSION['img'] = isset($_POST["qimg"])?$_POST["qimg"]:"http://34.215.40.163/Admin/uploads/quote/quote4.png";
 
// generate the URL to make request to authorize our application
$url = $twitteroauth->url(
    'oauth/authorize', [
        'oauth_token' => $request_token['oauth_token']
    ]
);
 
// and redirect
header('Location: '. $url);