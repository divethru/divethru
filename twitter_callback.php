<?php
require_once 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;
 
session_start();
 
$config = require_once 'config.php';

$oauth_verifier = filter_input(INPUT_GET, 'oauth_verifier');
 
if (empty($oauth_verifier) || empty($_SESSION['oauth_token']) ||  empty($_SESSION['oauth_token_secret'])) {
    // something's missing, go and login again
    header('Location: ' . $config['url_login']);
}

// connect with application token
$connection = new TwitterOAuth(
    $config['consumer_key'],
    $config['consumer_secret'],
    $_SESSION['oauth_token'],
    $_SESSION['oauth_token_secret']
);
 
// request user token
$token = $connection->oauth(
    'oauth/access_token', [
        'oauth_verifier' => $oauth_verifier
    ]
);

$twitter = new TwitterOAuth(
    $config['consumer_key'],
    $config['consumer_secret'],
    $token['oauth_token'],
    $token['oauth_token_secret']
);

$statusM = $twitter->upload('media/upload',['media' => $_SESSION['img']]);

$status = $twitter->post(
    "statuses/update", [
		"media_ids" => $statusM->media_id,
        "status" => $_SESSION['message']
    ]
);
 $url = "summary.php";
header('Location: '. $url);
//echo ('Created new status with #' . $status->id . PHP_EOL);