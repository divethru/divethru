<?php
session_start();
require_once( 'vendor/autoload.php' );
 /*
$fb = new Facebook\Facebook([
  'app_id' => '2099629993593048',
  'app_secret' => '0ea06bd5c147a61e33230b62429c5c32',
  'default_graph_version' => 'v2.10',
]);
*/ 

/*
$fb = new Facebook\Facebook([
  'app_id' => '176915049742280',
  'app_secret' => 'bf09a3463650320a8587f88cd56af469',
  'default_graph_version' => 'v2.10',
]);  */


	$fb = new Facebook\Facebook([
	  'app_id' => '182201742534607',
	  'app_secret' => '3207222a4c132b4e551170c5cc235216',
	  'default_graph_version' => 'v2.10',
	]);

$helper = $fb->getRedirectLoginHelper();
 
$permissions = ['email']; // Optional permissions for more permission you need to send your application for review
$loginUrl = $helper->getLoginUrl('http://34.215.40.163/callback.php', $permissions);
header("location: ".$loginUrl);
 
?>