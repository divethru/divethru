<?php

function tweet($message,$image) {

// add the codebird library
require_once('src/codebird.php');

$consumerKey = "OLF9ntJeX6nwrobTbO5O2hOaG";
$consumerSecret = "yERbbjct8fgFLEh2W5V5sIS5Rl3xoOgkuCY04etDQetBGLGZkd";
$accessToken = "874157933969293313-NsKAk5ns21sNG7ktwwguvaZRyuPCg7S";
$accessTokenSecret = "5v8kTaL50ujAimFWXSrzQPks64a2SuClaAUWxAIve0LJP";
// note: consumerKey, consumerSecret, accessToken, and accessTokenSecret all come from your twitter app at https://apps.twitter.com/
\Codebird\Codebird::setConsumerKey($consumerKey, $consumerSecret);
$cb = \Codebird\Codebird::getInstance();
$cb->setToken($accessToken, $accessTokenSecret);

//build an array of images to send to twitter
$reply = $cb->media_upload(array(
    'media' => $image
));

//upload the file to your twitter account
$mediaID = $reply->media_id_string;

//build the data needed to send to twitter, including the tweet and the image id
$params = array(
    'status' => "",
    'media_ids' => $mediaID
);
//post the tweet with codebird
$reply = $cb->statuses_update($params);
$image_url = $reply->entities->media[0]->url;
echo $image_url;
}

$img = isset($_POST["qimg"]) ? $_POST["qimg"] :'http://34.215.40.163/Admin/uploads/quote/quote3.png'; 
tweet('This is my sample tweet message',$img);
