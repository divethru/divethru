<?php
session_start();
$_SESSION["userid"] = $_POST["userid"];
require "PAYPAL_IPN.php";
require '../vendor/autoload.php';
define('FIREBASE_URL','https://divethru-71c56.firebaseio.com/');
define('FIREBASE_SECRET','k7AS9py1rGygBlLjQAvtfSroYaFCwpe0KzdrDAjQ');

$id = isset($_POST["userid"])?$_POST["userid"]:"12346";
$paypal = new PAYAPAL_IPN();
$paypal->run();


/*getsingle("Users/mnSK9biJp3bMZepxZrmy08MYfAc2");


function getsingle($path){
    	$fb = Firebase::initialize(FIREBASE_URL, FIREBASE_SECRET);

//or set your own implementation of the ClientInterface as second parameter of the regular constructor
$fb = new Firebase([ 'base_url' => FIREBASE_URL, 'token' => FIREBASE_SECRET ], new GuzzleHttp\Client());

$nodeGetContent = $fb->get($path);

return $nodeGetContent;
}*/
?>
<html>
<head>
</head>
<body>
<script type="text/javascript">
	window.localStorage.setItem("payment","done");
</script>	
</body>
</html>
